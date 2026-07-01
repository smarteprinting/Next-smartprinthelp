import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware } from '@/middleware/auth';

/**
 * POST /api/shipping
 * Calculate shipping rates and delivery estimates
 * Uses EasyPost API for real shipping carrier rates
 * 
 * Request body:
 * {
 *   address: string,
 *   city: string,
 *   state: string,
 *   postalCode: string,
 *   country: string,
 *   phone?: string,
 *   cartItems?: array
 * }
 */
export async function POST(request) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const body = await request.json();
    const { address, city, state, postalCode, country, phone, cartItems } = body;

    // Validate required fields
    if (!address || !city || !state || !postalCode) {
      return errorResponse(
        'Address, city, state, and postal code are required',
        400
      );
    }

    // Check if EasyPost API key is configured
    if (!process.env.EASYPOST_API_KEY) {
      console.error('EasyPost API Key not configured');
      // Return fallback shipping rates if EasyPost is not available
      return successResponse(
        getFallbackShippingRates(cartItems),
        'Fallback shipping rates returned (EasyPost not configured)',
        200
      );
    }

    try {
      const EasyPostClient = require('@easypost/api');
      const client = new EasyPostClient(process.env.EASYPOST_API_KEY);

      // Create To Address (verify to get coordinates if possible)
      const toAddress = await client.Address.create({
        name: authResult.user ? authResult.user.name : 'Customer',
        street1: address,
        city,
        state,
        zip: postalCode,
        country: country || 'US',
        phone: phone || '8883225251',
        email: authResult.user ? authResult.user.email : undefined,
      });

      // Create From Address (Company Location)
      const fromAddress = await client.Address.create({
        company: 'Smart Print Help',
        street1: process.env.COMPANY_ADDRESS || '95 Broadacre Dr',
        city: process.env.COMPANY_CITY || 'Kitchener',
        state: process.env.COMPANY_STATE || 'ON',
        zip: process.env.COMPANY_ZIP || 'N2R 0S5',
        country: process.env.COMPANY_COUNTRY || 'CA',
        phone: process.env.COMPANY_PHONE || '8883225251',
      });

      // Calculate total weight in ounces
      // Assume ~16 oz (1 lb) per item quantity if no weight specified
      const totalWeight = cartItems && cartItems.length > 0
        ? cartItems.reduce((acc, item) => acc + (item.weight || 16) * (item.qty || 1), 0)
        : 16;

      // Create Parcel
      const parcel = await client.Parcel.create({
        weight: totalWeight,
        length: 12,
        width: 10,
        height: 6
      });

      // Create Shipment
      const shipment = await client.Shipment.create({
        to_address: toAddress,
        from_address: fromAddress,
        parcel
      });

      // Extract rates from shipment
      const rates = shipment.rates.map(rate => ({
        carrier: rate.carrier,
        service: rate.service,
        rate: parseFloat(rate.rate),
        currency: 'USD',
        days: rate.est_days,
        deliveryDays: rate.est_delivery_days
      }));

      // Sort rates by price (lowest first)
      rates.sort((a, b) => a.rate - b.rate);

      // Calculate distance if coordinates available
      let distance = null;
      if (toAddress.verifications?.delivery?.details) {
        const toCoords = toAddress.verifications.delivery.details;
        const fromCoords = { latitude: 43.4255, longitude: -80.5112 }; // Kitchener, ON
        
        if (toCoords.latitude && toCoords.longitude) {
          distance = calculateDistance(
            fromCoords.latitude,
            fromCoords.longitude,
            toCoords.latitude,
            toCoords.longitude
          );
        }
      }

      const shippingData = {
        rates: rates.length > 0 ? rates : getFallbackShippingRates(cartItems),
        distance,
        estimatedDelivery: rates.length > 0 ? rates[0].deliveryDays : '5-7 business days',
        validated: true,
        toAddress: {
          name: toAddress.name,
          street1: toAddress.street1,
          city: toAddress.city,
          state: toAddress.state,
          zip: toAddress.zip,
          country: toAddress.country,
          verified: toAddress.verifications?.delivery?.success || false
        }
      };

      return successResponse(shippingData, 'Shipping rates calculated', 200);
    } catch (easyPostError) {
      console.warn('EasyPost API error, returning fallback rates:', easyPostError.message);
      
      // Return fallback rates if EasyPost fails
      const fallbackRates = getFallbackShippingRates(cartItems);
      return successResponse(
        fallbackRates,
        'Fallback shipping rates returned',
        200
      );
    }
  } catch (error) {
    console.error('Shipping POST error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * Helper: Calculate distance between two coordinates (haversine formula)
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  
  const R = 3959; // Earth radius in miles
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return parseFloat(distance.toFixed(1));
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Helper: Return fallback shipping rates when EasyPost is unavailable
 */
function getFallbackShippingRates(cartItems) {
  const itemCount = cartItems ? cartItems.reduce((acc, item) => acc + (item.qty || 1), 0) : 1;
  const baseWeight = itemCount * 5; // lbs
  
  // Calculate base rate based on weight
  const standardRate = 5.99 + (baseWeight * 0.5);
  const expressRate = 12.99 + (baseWeight * 0.8);
  const overnightRate = 24.99 + (baseWeight * 1.2);

  return {
    rates: [
      {
        carrier: 'Smart Print Help Standard',
        service: 'USPS Priority Mail',
        rate: parseFloat(standardRate.toFixed(2)),
        currency: 'USD',
        days: 3,
        deliveryDays: '3-5 business days'
      },
      {
        carrier: 'Smart Print Help Express',
        service: 'USPS Express Mail',
        rate: parseFloat(expressRate.toFixed(2)),
        currency: 'USD',
        days: 1,
        deliveryDays: '1-2 business days'
      },
      {
        carrier: 'Smart Print Help Overnight',
        service: 'FedEx Overnight',
        rate: parseFloat(overnightRate.toFixed(2)),
        currency: 'USD',
        days: 0,
        deliveryDays: 'Next business day'
      }
    ],
    distance: null,
    estimatedDelivery: '3-5 business days',
    validated: false,
    toAddress: null,
    fallback: true
  };
}
