export default function Head() {
  return (
    <>
      {/* Event snippet for Page view conversion page - placed in head after global gtag */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "gtag('event', 'conversion', { 'send_to': 'AW-18114921677/BbFRCPXCu6gcEM2J771D', 'value': 1.0, 'currency': 'USD' });",
        }}
      />
    </>
  );
}
