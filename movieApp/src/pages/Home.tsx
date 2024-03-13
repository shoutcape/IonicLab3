import { IonAvatar, useIonLoading, useIonAlert, IonList, IonSelectOption, IonSelect, IonItem, IonLabel, IonSearchbar, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonIcon } from '@ionic/react';
import useApi, { SearchResult, SearchType } from '../hooks/useApi';
import { useEffect, useState } from 'react';
import { videocamOutline, gameControllerOutline, tvOutline } from 'ionicons/icons';

const Home: React.FC = () => {

  const {searchData, getDetails} = useApi()

  const [searchTerm, setSearchTerm] = useState('')
  const [type, setType] = useState<SearchType>(SearchType.all)
  const [results, setResults] = useState<SearchResult[]>([])
  const [presentAlert] = useIonAlert()
  const [loading, dismiss] = useIonLoading()

  useEffect(() => {
    if (searchTerm === '') {
      setResults([])
      return
    }

    const loadData = async () => {
      await loading()
      const result: any = await searchData(searchTerm, type)
      console.log("result", result)
      await dismiss()
      if (result?.Error) {
        presentAlert(result.Error)
      } else {
        setResults(result.Search)
      }
    }
    loadData()
  }, [searchTerm, type])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonTitle>My Movie App</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSearchbar 
            value={searchTerm} 
            debounce={300} 
            onIonChange={(e) => setSearchTerm(e.detail.value!)}
            ></IonSearchbar>

          <IonItem>
            <IonSelect label='Select SearchType' value={type} onIonChange={(e) => setType(e.detail.value!)}>
              <IonSelectOption value="">All</IonSelectOption>
              <IonSelectOption value="movie">Movies</IonSelectOption>
              <IonSelectOption value="series">Series</IonSelectOption>
              <IonSelectOption value="game">Games</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonList>
            {results.map((item: SearchResult) => (
              <IonItem button key={item.imdbID} routerLink={`/movies/${item.imdbID}`}>
                <IonAvatar slot='start'>
                 <IonImg src={item.Poster} /> 
                </IonAvatar>
                <IonLabel>
                  <h2>{item.Title}</h2>
                  <p>{item.Year}</p>
                </IonLabel>
                  {item.Type === 'movie' && <IonIcon slot='end' icon={videocamOutline}/>}
                  {item.Type === 'series' && <IonIcon slot='end' icon={tvOutline}/>}
                  {item.Type === 'game' && <IonIcon slot='end' icon={gameControllerOutline}/>}
              </IonItem>
            ))}
          </IonList>
        </IonContent>
    </IonPage>
  )
}

export default Home;
