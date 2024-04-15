import {
  IonBackButton,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import useApi, { DetailsResult } from "../hooks/useApi";
import { bodyOutline, clipboardOutline, information, starHalfOutline, trophyOutline } from "ionicons/icons";

interface DetailsPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const Details: React.FC<DetailsPageProps> = ({ match }) => {
  const { getDetails } = useApi();
  const [detail,setDetails ] = useState<DetailsResult | null>(null);

  useIonViewWillEnter(() => {

    const id = match.params.id;
    const fetchData = async () => {
        try {
            const result = await getDetails(id);
            setDetails(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
    
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start">
            <IonBackButton
              defaultHref="/movies"
              
            ></IonBackButton>
          </IonButton>
          <IonTitle>{detail?.Genre}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
       {information && 
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{detail?.Title}</IonCardTitle>
                <IonCardSubtitle>{detail?.Year}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonImg src={detail?.Poster}/>
                <IonItem lines="none">
                    <IonIcon icon={starHalfOutline} slot="start" color="warning"/>
                    <IonLabel>{detail?.imdbRating}</IonLabel>
                </IonItem>
            </IonCardContent>
        </IonCard>}
        <IonModal trigger="open-modal" initialBreakpoint={.25} breakpoints={[0,.25,.5,.75]}>
            <IonContent className="ion-padding">
                <IonItem lines="none">
                    <IonIcon slot="start" icon={clipboardOutline}></IonIcon>
                    <IonLabel className="ion-text-wrap">{detail?.Director}</IonLabel>
                </IonItem>
                <IonItem lines="none">
                    <IonIcon slot="start" icon={bodyOutline}></IonIcon>
                    <IonLabel className="ion-text-wrap">{detail?.Actors}</IonLabel>
                </IonItem>
                <IonItem lines="none">
                    <IonIcon slot="start" icon={trophyOutline}></IonIcon>
                    <IonLabel className="ion-text-wrap">{detail?.Awards}</IonLabel>
                </IonItem>

                <p className="ion-padding">{detail?.Plot}</p>
            </IonContent>
        </IonModal>
      </IonContent>
        <IonFooter>
            <IonButton expand="full" id="open-modal">show more</IonButton>
        </IonFooter>
    </IonPage>
  );
};

export default Details;
