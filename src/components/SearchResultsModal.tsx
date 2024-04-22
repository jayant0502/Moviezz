import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { AllData, SearchResult } from "../hooks/useApi";
import { tvOutline, videocamOutline } from "ionicons/icons";
import { baseUrl } from "./MovieLists";

export interface SearchResultsModalProps {
  isOpen: boolean;
  results: SearchResult[];
  onClose: () => void;
}

const SearchResultsModal: React.FC<SearchResultsModalProps> = ({
  isOpen,
  onClose,
  results,
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => onClose()}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {results?.map(({id,poster_path,title,media_type , name}: SearchResult) => (
            <IonItem
              button
              key={id}
              onClick={() => onClose()}
              routerLink={`/movies/${id}`}
            >
              <IonAvatar slot="start">
                <IonImg src={baseUrl + poster_path} />
              </IonAvatar>
              <IonLabel className="ion-text-wrap">{media_type === "movie" ? title : name}</IonLabel>

              {media_type === "movie" && (
                <IonIcon slot="end" src={videocamOutline}></IonIcon>
              )}
              {media_type == "tv" && (
                <IonIcon slot="end" src={tvOutline}></IonIcon>
              )}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default SearchResultsModal;
