import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (buffer, filename) => {
    return new Promise((resolve, reject) => {
        // Strip the file extension so Cloudinary doesn't add double extensions (e.g. .avif.avif)
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
        
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'products',
                public_id: `${Date.now()}-${nameWithoutExt.replace(/[^a-zA-Z0-9_-]/g, '')}`,
                resource_type: 'image',
                transformation: [
                    { width: 800, height: 800, crop: 'limit' },
                    { quality: 'auto' }
                ]
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        );
        uploadStream.end(buffer);
    });
};
