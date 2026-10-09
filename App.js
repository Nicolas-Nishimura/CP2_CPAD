import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  // Texto que está sendo digitado no TextInput
  const [texto, setTexto] = useState('');

  // Lista de itens de compra (começa vazia)
  const [itens, setItens] = useState([]);

  function adicionarItem() {
    // Ignora se o campo estiver vazio ou só com espaços
    if (texto.trim() === '') {
      return;
    }

    const novoItem = {
      id: Date.now().toString(), // id único para a key da FlatList
      nome: texto.trim(),
    };

    // IMPORTANTE: criamos um NOVO array com spread operator.
    // Nunca usar itens.push(), porque isso altera o array original
    // e o React não percebe a mudança de estado.
    setItens([...itens, novoItem]);

    // Limpa o campo depois de adicionar
    setTexto('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Lista de Compras</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Digite um novo item"
            placeholderTextColor="#9aa0a6"
            value={texto}
            onChangeText={setTexto}
            onSubmitEditing={adicionarItem}
            returnKeyType="done"
          />

          <TouchableOpacity style={styles.botao} onPress={adicionarItem}>
            <Text style={styles.botaoTexto}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.contador}>
          {itens.length} {itens.length === 1 ? 'item' : 'itens'}
        </Text>

        <FlatList
          data={itens}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listaConteudo}
          ListEmptyComponent={
            <Text style={styles.vazio}>
              Sua lista está vazia. Adicione o primeiro item!
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Text style={styles.itemTexto}>{item.nome}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // O SafeAreaView cuida só do fundo e da área segura do aparelho.
  // Nao colocamos padding aqui: na versao web o react-native-web
  // sobrescreve o padding deste componente e o valor e ignorado.
  container: {
    flex: 1,
    backgroundColor: '#f5f6f8',
  },
  // Todo o espaçamento vive aqui. O maxWidth trava a largura num
  // tamanho de celular e o alignSelf centraliza quando a tela e grande.
  conteudo: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    paddingTop: 56,
    paddingHorizontal: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2933',
    marginBottom: 20,
  },
  form: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d8dce1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2933',
  },
  botao: {
    backgroundColor: '#2f6fed',
    borderRadius: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  contador: {
    marginTop: 18,
    marginBottom: 8,
    fontSize: 14,
    color: '#6b7280',
  },
  listaConteudo: {
    paddingBottom: 32,
  },
  vazio: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#9aa0a6',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e6e8eb',
  },
  itemTexto: {
    fontSize: 16,
    color: '#1f2933',
  },
});