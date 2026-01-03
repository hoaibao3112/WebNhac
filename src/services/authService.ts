type Credentials = { email: string; password: string };

type RegisterPayload = { name: string; email: string; password: string };

type LoginResponse = {
  token: string;
  user: {
    id?: number;
    name: string;
    email: string;
  };
};

const authService = {
  login: async (creds: Credentials): Promise<LoginResponse> => {
    // Try to call backend; if fails, return a fake token for demo purposes
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || "Đăng nhập thất bại");
      }
      const data = await res.json();
      return {
        token: data.token,
        user: data.user || { name: data.name || "User", email: creds.email }
      };
    } catch (err) {
      // fallback: accept any credential and return demo data
      return Promise.resolve({
        token: "demo-token-123",
        user: {
          name: creds.email.split('@')[0],
          email: creds.email
        }
      });
    }
  },
  register: async (payload: RegisterPayload): Promise<void> => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || "Đăng ký thất bại");
      }
      return;
    } catch (err) {
      // fallback: resolve for demo
      return Promise.resolve();
    }
  },
};

export default authService;
