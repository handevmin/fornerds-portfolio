import './globals.css';

export const metadata = {
  title: 'ForNerds - AI 챗봇 포트폴리오',
  description: 'ForNerds의 인공지능 챗봇 포트폴리오 모음. 다양한 맞춤형 챗봇 서비스를 살펴보세요.',
  keywords: 'ForNerds, 챗봇, AI, 개발, 포트폴리오, 웹사이트, 인공지능',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  )
}