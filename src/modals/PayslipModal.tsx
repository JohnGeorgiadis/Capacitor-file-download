import { Directory, Filesystem } from "@capacitor/filesystem";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
  isPlatform,
  useIonToast,
} from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import { memo, useCallback } from "react";
import { PayslipCard } from "../components/PayslipCard";
import { data } from "../data";
import { FileOpener } from "@capawesome-team/capacitor-file-opener";

type PayslipModalProps = {
  selectedId: string;
  onDismiss: () => void;
};

export const PayslipModal = memo(function Payslip({
  selectedId,
  onDismiss,
}: PayslipModalProps) {
  // This would be a singe call to the backend with the selectedId
  const payslip = data.find((p) => p.id === selectedId);

  const [present] = useIonToast();

  const presentToast = (message: string) => {
    present({
      message,
      duration: 2500,
      position: "bottom",
    });
  };

  const openFile = async (path: string) => {
    await FileOpener.openFile({
      path,
    });
  };

  const onDownloadClickMobile = useCallback(async () => {
    const { publicStorage } = await Filesystem.checkPermissions();

    if (publicStorage !== "granted") {
      await Filesystem.requestPermissions();
      presentToast(
        "Please try downloading the file again after granting the permission"
      );
      return;
    }

    try {
      if (publicStorage !== "granted") {
        await Filesystem.requestPermissions();
      } else {
        const downloadedFile = await Filesystem.downloadFile({
          url: payslip?.fileUrl ?? "",
          path: `${Directory.Documents}/file_${payslip?.id}.png`,
        });
        if (downloadedFile?.path) {
          openFile(downloadedFile.path);
        } else {
          presentToast(
            "Download cannot be opened at the moment, you can find it in your downloads folder"
          );
        }
      }
    } catch (_error) {
      presentToast("Download failed, please try again later");
    }
  }, [Filesystem, openFile, presentToast, payslip]);

  const renderDownloadButton = useCallback(
    (url: string) => {
      if (isPlatform("mobile")) {
        return (
          <IonButton
            expand="block"
            role="payslip-modal-download"
            onClick={onDownloadClickMobile}
          >
            <IonIcon slot="start" icon={downloadOutline} />
            Download
          </IonButton>
        );
      } else {
        return (
          <a href={url} download>
            <IonButton expand="block" role="payslip-modal-download">
              Download
            </IonButton>
          </a>
        );
      }
    },
    [isPlatform, onDownloadClickMobile]
  );

  return (
    <IonModal isOpen={!!selectedId} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Payslip - {payslip?.id}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {payslip ? (
          <>
            <PayslipCard {...payslip}>
              {renderDownloadButton(payslip.fileUrl)}
            </PayslipCard>
          </>
        ) : (
          <IonText>Payslip not found</IonText>
        )}
      </IonContent>
    </IonModal>
  );
});
