'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import NavBar from '@/components/NavBar';
import theme from '@/styles/theme';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: 'background.default',
              }}
            >
              <NavBar />
              <Container component="main" maxWidth="lg" sx={{ flex: 1, py: 4 }}>
                {children}
              </Container>
              <Box
                component="footer"
                sx={{
                  py: 3,
                  px: 2,
                  mt: 'auto',
                  bgcolor: 'background.paper',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  textAlign: 'center',
                }}
              >
                <Container maxWidth="lg">
                  Blog Dashboard &copy; {new Date().getFullYear()}
                </Container>
              </Box>
            </Box>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}