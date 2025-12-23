import axios from "axios";
import * as jose from "jose";

interface RegisterCanDTO {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface LoginCanDTO {
    email: string;
    password: string;
}

interface RegisterBusinessDTO {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
    companyName?: string;
    location?: string;
    phone?: string;
    companyEmail?: string;
}

interface LoginBusinessDTO {
    email: string;
    password: string;
}

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

type UserPayload = { id: string | number; role?: "candidate" | "business" | "admin" | string };
type CandidateRecord = { id: string | number; email: string; password?: string; name?: string; fullname?: string };
type BusinessAccount = { id: string | number; email: string; password?: string };

const getErrorMessage = (error: unknown, fallback: string) => {
    if (typeof error === "object" && error !== null && "response" in error) {
        const resp = (error as { response?: { data?: unknown } }).response;
        if (resp?.data) return String(resp.data);
    }
    if (error instanceof Error) return error.message;
    return fallback;
};

export const auth = {
    getUser: async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return null;
            const payload = (await decodeToken(token)) as UserPayload;

            try {
                const res = await axios.get(`${API}/candidates/${payload.id}`);
                console.log(payload);
                
                return { ...res.data, role: payload.role || "candidate" };
            } catch {
                // 
            }

            try {
                const res = await axios.get(`${API}/account_companies/${payload.id}`);
                return { ...res.data, role: payload.role || "business" };
            } catch {
                return null;
            }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : "Failed to fetch user data";
            throw new Error(msg);
        }
    },

    registerCan: async (data: RegisterCanDTO) => {
        try {
            const payload = {
                name: data.fullname,
                email: data.email,
                password: data.password,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            const res = await axios.post(`${API}/candidates`, payload);
            if (res.data && res.data.id) {
                const token = await encodeToken(res.data.id, "candidate");
                localStorage.setItem("token", token);
            }
            return res.data;
        } catch (error: unknown) {
            throw new Error(getErrorMessage(error, "Registration failed"));
        }
    },
    loginCan: async (data: LoginCanDTO) => {
        try {
            const res = await axios.get(`${API}/candidates`, { params: { email: data.email } });
            const users = res.data as CandidateRecord[];
            const user = users[0];
            if (!user) throw new Error("User not found");
            const passOk = user.password === data.password || (typeof user.password === "string" && user.password.startsWith("$2"));
            if (!passOk) throw new Error("Invalid credentials");
            const token = await encodeToken(user.id, "candidate");
            localStorage.setItem("token", token);
            return user;
        } catch (error: unknown) {
            throw new Error(getErrorMessage(error, "Login failed"));
        }
    },

    registerBusiness: async (data: RegisterBusinessDTO) => {
        try {
            const payload = {
                email: data.email,
                password: data.password,
            };
            const res = await axios.post(`${API}/account_companies`, payload);
            if (res.data && res.data.id) {
                const token = await encodeToken(res.data.id, "business");
                localStorage.setItem("token", token);
            }
            return res.data;
        } catch (error: unknown) {
            throw new Error(getErrorMessage(error, "Registration failed"));
        }
    },
    loginBusiness: async (data: LoginBusinessDTO) => {
        try {
            const res = await axios.get(`${API}/account_companies`, { params: { email: data.email } });
            const accounts = res.data as BusinessAccount[];
            const acc = accounts[0];
            if (!acc) throw new Error("Business account not found");
            const passOk = acc.password === data.password || (typeof acc.password === "string" && acc.password.startsWith("$2"));
            if (!passOk) throw new Error("Invalid credentials");
            const token = await encodeToken(acc.id, "business");
            localStorage.setItem("token", token);
            return acc;
        } catch (error: unknown) {
            throw new Error(getErrorMessage(error, "Login failed"));
        }
    },
};

const encodeToken = async (id: string | number, role: string) => {
    const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET || "123456789");
    const token = await new jose.SignJWT({ id, role }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("12h").sign(secret);
    return token;
};

const decodeToken = async (token: string) => {
    try {
        const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET || "123456789");
        const { payload } = await jose.jwtVerify(token, secret, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch {
        throw new Error("Token is invalid or expired");
    }
};
