import { createRoot } from "react-dom/client";
import "./index.css";
import 'antd/dist/reset.css';
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import "./i18n/i18n.setup.ts";

createRoot(document.getElementById("root")!).render(
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: "#BC2228",
                borderRadius: 4,
            },
            components: {
                Select: {
                    colorText: "#000000",
                },
            },
        }}
    >
        <Provider store={store}>
            <App />
        </Provider>
    </ConfigProvider>
);
