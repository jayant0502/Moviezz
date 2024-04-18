import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { starHalfOutline, tvOutline, videocamOutline } from "ionicons/icons";
import "./MovieLists.css";

interface MovieListsProp {
  movieData: any[];
}

const baseUrl = "https://image.tmdb.org/t/p/original";

const MovieLists: React.FC<MovieListsProp> = ({ movieData }) => {
  return (
    <div className="movie-list-container">
      <IonGrid>
        <IonRow>
          {movieData.map(({ id, poster_path, media_type, title, name, release_date, first_air_date, vote_average }) => (
            <IonCol key={id} size="12" size-md="6" size-lg="4">
              <IonCard className="movie-card">
                <IonImg className="poster-img" src={baseUrl + poster_path} />
                <IonCardHeader className="card-header">
                  <IonCardTitle>{media_type === "movie" ? title : name}</IonCardTitle>
                  <IonCardSubtitle>{media_type === "movie" ? release_date : first_air_date}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="card-content">
                  <IonItem>
                    <IonCardSubtitle>Category</IonCardSubtitle>
                    <IonIcon icon={media_type === "movie" ? videocamOutline : tvOutline} color="warning" />
                    <IonLabel>{media_type}</IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonCardSubtitle>Rating</IonCardSubtitle>
                    <IonIcon icon={starHalfOutline} color="warning" />
                    <IonLabel>{vote_average}/10 Votes</IonLabel>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default MovieLists;
