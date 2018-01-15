import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {

    onLike(id, likes) {
        this.props.mutate({ 
            variables: { id }
        });
    }
    
    renderLyrics() {
        return this.props.lyrics.map( ({id, content, likes}) => {
            console.log(likes);
            return(
                <li key={ id } className="collection-item">
                    { content }
                    <i
                        className="material-icons right"
                        onClick={ () => this.onLike(id, likes) }
                    >
                        thumb_up
                    </i>
                    <span className="right">{ likes }</span>
                </li>
            )
        });
    }

    render() {
        return (
            <ul className="collection">
                { this.renderLyrics() }
            </ul>
        );
    }
}

const mutation = gql`
    mutation LikeLyric($id: ID!) {
        likeLyric(id:$id) {
            content
            likes
        }
    }
`;

export default graphql(mutation)(LyricList);
