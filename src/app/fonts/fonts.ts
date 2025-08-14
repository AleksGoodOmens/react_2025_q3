import localFont from 'next/font/local';

const jetBrains = localFont({
  src: [
    {
      path: './JetBrainsMono-Bold.woff2',
      weight: '600',
      style: 'bold',
    },
    {
      path: './JetBrainsMono-Light.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './JetBrainsMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});

export default jetBrains;
