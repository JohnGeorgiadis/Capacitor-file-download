import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCallback, useState } from "react";
import { PayslipCard } from "../components/PayslipCard";
import { data } from "../data";
import "./Feed.css";
import { PayslipModal } from "../modals/PayslipModal";

const Feed: React.FC = () => {
  const payslips = data;
  const [selectedId, setSelectedId] = useState("");

  const onPayslipClick = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle role="header-title">Feed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol offsetMd="3" sizeMd="6" offsetXl="4" sizeXl="4">
              {payslips.map((payslip) => (
                <PayslipCard
                  key={payslip.id}
                  {...payslip}
                  onClick={() => onPayslipClick(payslip.id)}
                />
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Modal for single payslip */}
        <PayslipModal
          selectedId={selectedId}
          onDismiss={() => setSelectedId("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
