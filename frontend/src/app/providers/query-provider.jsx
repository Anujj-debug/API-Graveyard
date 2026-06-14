import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/context/auth-context";

const queryClient = new QueryClient();

export default function QueryProvider({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
