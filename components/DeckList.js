import React from 'react'
import {View, StyleSheet, AsyncStorage} from "react-native";
import Deck from "./Deck";
import {connect} from "react-redux";
import {handleAddDeck} from "../actions/DeckActions";

class DeckList extends React.Component {

    componentDidMount() {
        this.updateDecks();
    }

    updateDecks() {
        return AsyncStorage.getItem('decks').then(results => {
            const decks = JSON.parse(results);

            decks.map(deck => {
                this.props.dispatch(handleAddDeck(deck));
            });
        });
    };

    render() {
        const { navigate } = this.props.navigation;
        const { decks } = this.props;

        return (
            <View style={styles.deckListContainer}>
                {decks && decks.map(deck => (
                    <Deck deck={deck} navigate={navigate}/>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckListContainer: {
        height: '25%',
        textAlign: 'center',
        alignItems: 'center',
    }
});

function mapStateToProps(store) {
    return {
        decks: store.decks
    }
}

export default connect(mapStateToProps)(DeckList);