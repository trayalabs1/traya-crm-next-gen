import Maker from "@components/CMS/Maker";
import { ContentLayout } from "@components/Layout/ContentLayout";
import AdminPanelLayout from "@components/Layout/Layout";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading</p>}>
        <AdminPanelLayout>
          <ContentLayout title="Dashboard">{<Maker />}</ContentLayout>
        </AdminPanelLayout>
      </Suspense>
    </BrowserRouter>
  );
}
