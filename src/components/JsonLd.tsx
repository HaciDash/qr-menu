export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Haşim Usta Kebap',
    image: 'https://hasimusta.com/og-image.jpg',
    '@id': 'https://hasimusta.com',
    url: 'https://hasimusta.com',
    telephone: '+905551234567',
    priceRange: '₺₺',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Seyhan',
      addressLocality: 'Adana',
      addressRegion: 'Adana',
      postalCode: '01000',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.000,
      longitude: 35.321,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '11:00',
        closes: '23:00',
      },
    ],
    servesCuisine: ['Turkish', 'Middle Eastern', 'Kebab'],
    acceptsReservations: 'True',
    menu: 'https://hasimusta.com#menu',
    hasMenu: {
      '@type': 'Menu',
      hasMenuSection: [
        {
          '@type': 'MenuSection',
          name: 'Zırh Kıyma Kebaplar',
          description: 'Hand-minced authentic Adana kebabs',
        },
        {
          '@type': 'MenuSection',
          name: 'Fırından Lezzetler',
          description: 'Oven-baked specialties',
        },
        {
          '@type': 'MenuSection',
          name: 'Aperatifler',
          description: 'Traditional Turkish appetizers',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
    paymentAccepted: 'Cash, Credit Card',
    currenciesAccepted: 'TRY',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
