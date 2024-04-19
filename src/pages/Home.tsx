import {
  IonAvatar,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import "./Home.css";
import useApi, {
  SearchError,
  SearchResult,
  SearchType,
  AllData,
} from "../hooks/useApi";
import { useEffect, useState } from "react";
import {
  videocamOutline,
  tvOutline,
  gameControllerOutline,
} from "ionicons/icons";
import MovieLists from "../components/MovieLists";
import logo from "../assests/logo/logo.png";

const Home: React.FC = () => {
  const { searchData, getALLDATA } = useApi();
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [movies, setMovies] = useState<AllData[]>([]);
  const [error, setError] = useState<SearchError[]>([]);
  const [presentAlert] = useIonAlert();
  const [loading, dismiss] = useIonLoading();

  useEffect(() => {
    const allMovies = async () => {
      try {
        // await loading();
        const res: any = await getALLDATA();
        // !res && await dismiss()
        setMovies(res?.results);

        console.log("movies data", res);
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    const data = async () => {
      try {
        await loading();
        const res: any = await searchData(searchTerm, type);
        await dismiss();
        if (res?.Error) {
          presentAlert(res?.Error);
        } else {
          setResults(res.Search);
        }
      } catch (err) {
        console.log("Error", err);
      }
    };

    if (searchTerm == "") {
      allMovies();
    } else {
      data();
    }
  }, [searchTerm, type]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div className="logo-container">
                  <IonImg src={logo} alt="logo" className="logo"></IonImg>
                  <IonText>Moviezz</IonText>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonSearchbar
                  value={searchTerm}
                  debounce={300}
                  color={"light"}
                  mode="md"
                  className="ion-padding searchbar"
                  onIonChange={(e) =>
                    setSearchTerm(e.detail.value?.trim() || "")
                  }
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>Search Type</IonLabel>
          <IonSelect value={type} onIonChange={(e) => setType(e.detail.value)}>
            <IonSelectOption value={"multi"}>All</IonSelectOption>
            <IonSelectOption value={"movie"}>Movie</IonSelectOption>
            <IonSelectOption value={"tv"}>Tv Series</IonSelectOption>
          </IonSelect>
        </IonItem>

        {searchTerm !== "" && (
          <IonList>
            {results.map((item: SearchResult) => (
              <IonItem
                button
                key={item.imdbID}
                routerLink={`/movies/${item.imdbID}`}
              >
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
        )}
        {searchTerm === "" && <MovieLists movieData={movies}></MovieLists>}
      </IonContent>
    </IonPage>
  );
};

export default Home;
