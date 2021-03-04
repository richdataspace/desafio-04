import React, { useEffect, useState} from "react";
import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";


// MAIN FUNCTION
export default function App() {

// DEFINICAO DA VARIAVEL DE ESTADO
  const [repositories, setRepositories] = useState();

// DEFINICAO DA FUNCAO DA VARIAVEL DE ESTADO
  useEffect(() => {
    api.get(`repositories`).then(response => {
      setRepositories(response.data);
    })
  }, []);


  // CHAMADA ASSINCRONA DA FUNCAO DO ADD REPOSITORY COM O METODO POST
  async function handleLikeRepository(id) {

  // CHAMADA DA API PELO ID
    const response = await api.post(`repositories/${id}/like`);


  // DEFINE A VARIALVE LIKED REPOSITORY PELO DATA DO RESPONSE
    const likedRepository = response.data;

  // PASSAMOS UM MAP AQUI ATE QUE ENCONTRE O REPOSITORIO COM MATCH NO ID,
  // E ENTAO RETORNE O LIKEDREPOSITORY PARA O REPOSITORIESUPDATE
    const repositoriesUpdated = repositories.map(repository => {
      if(repository.id === id) {
        return likedRepository;
      } else {
        return repository;
      }
    });

   // CHAMAMOS A FUNCAO DE ESTADO COM O REPOSITORIESUPDATED, RESPEITANDO A IMUTABILIDADE
   // E ATUALIZANDO A VARIAVEL REPOSITORIES
    setRepositories(repositoriesUpdated);

  }

  // O RETORNO EFETIVO DA FUNCAO APP()
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container}>

        <FlatList 
        data={repositories}
        keyExtractor={repository => repository.id}
        renderItem={({ item: repository}) => (

        <View style={styles.repositoryContainer}>

          <Text style={styles.repository}>{repository.title}</Text>

          <View style={styles.techsContainer}>
            {repository.techs.map(tech => (
                <Text key={tech} style={styles.tech}>
                {tech}
              </Text>
            ))}
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              testID={`repository-likes-${repository.id}`}
            >
              {repository.likes} curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repository.id)}
            testID={`like-button-${repository.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>
        )}

        />

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
