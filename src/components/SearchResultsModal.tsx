import { IonAvatar, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonModal } from "@ionic/react";
import React from "react";
import { SearchResult } from "../hooks/useApi";
import { gameControllerOutline, tvOutline, videocamOutline } from "ionicons/icons";

interface SearchResultsModalProps {
  isOpen: boolean;
  results: SearchResult[];
  onClose: () => void;
}

const SearchResultsModal: React.FC<SearchResultsModalProps> = ({isOpen,onClose,results}) => {
  return <IonModal isOpen={isOpen} onDidDismiss={onClose} >
        <IonContent>
            <IonList>
            {results.map((item: SearchResult) => (
            <IonItem button key={item.imdbID} routerLink={`/movies/${item.imdbID}`}>
              <IonAvatar slot="start">
                <IonImg src={item.Poster} />
              </IonAvatar>
              <IonLabel className="ion-text-wrap">{item.Title}</IonLabel>

              {item.Type === "movie" && (
                <IonIcon slot="end" src={videocamOutline}></IonIcon>
              )}
              {item.Type == "series" && (
                <IonIcon slot="end" src={tvOutline}></IonIcon>
              )}
              {item.Type == "game" && (
                <IonIcon slot="end" src={gameControllerOutline}></IonIcon>
              )}
            </IonItem>
          ))}
            </IonList>
        </IonContent>
  </IonModal>;
};

export default SearchResultsModal;
