import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonRippleEffect,
} from "@ionic/react";
import { memo, ReactNode } from "react";

export type PayslipCardProps = {
  id: string;
  fromDate: string;
  toDate: string;
  fileUrl: string;
  onClick?: () => void;
  children?: ReactNode;
};

export const PayslipCard = memo(function PayslipCard({
  fromDate,
  toDate,
  fileUrl,
  onClick,
  children,
}: PayslipCardProps) {
  return (
    <IonCard
      onClick={onClick}
      className="ion-activatable ripple-parent card"
      role="payslip-card"
    >
      <IonImg alt="Payslip image" src={fileUrl} role="payslip-card-image" />
      <IonCardHeader>
        <IonCardTitle role="payslip-card-header">Payslip</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonCardSubtitle role="payslip-card-dates">
          {fromDate} to {toDate}
        </IonCardSubtitle>
      </IonCardContent>

      {children}
      {onClick && <IonRippleEffect />}
    </IonCard>
  );
});
