const parseRes = (res) => res.json();
const parseUsername = (username) => username.toLowerCase().trim();

export default {
  getBio(username) {
    username = parseUsername(username);

    return fetch(`https://api.github.com/users/${ username }`)
    .then( parseRes );
  },

  getRepos(username) {
    username = parseUsername(username);

    return fetch(`https://api.github.com/users/${ username }/repos`)
    .then( parseRes );
  }
}
