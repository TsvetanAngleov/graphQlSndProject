import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import query from "../queries/fetchSongsList";
import singleSongQuery from "../queries/fetchSingleSong";

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.mutate({
      variables: { content: this.state.content, songId: this.props.songId },
      refetchQueries: [{ query }, { singleSongQuery }],
    });
  }
  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Add a lyric</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Lyric:</label>
          <input
            onChange={(event) => this.setState({ content: event.target.value })}
            value={this.state.content}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation addLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
