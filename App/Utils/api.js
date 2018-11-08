const formatUsername = username => username.toLowerCase().trim();

export const api = {
  getBio(username) {
    const formattedUsername = formatUsername(username);
    const url = `https://api.github.com/users/${formattedUsername}`;
    return fetch(url).then(res => res.json());
  },
  getRepos(username) {
    const formattedUsername = formatUsername(username);
    const url = `https://api.github.com/users/${formattedUsername}/repos`;
    return fetch(url).then(res => res.json());
  },
  getNotes(username) {
    const formattedUsername = formatUsername(username);
    const url = `https://github-saver-b6274.firebaseio.com/${formattedUsername}.json`;
    return fetch(url).then(res => res.json());
  },
  addNote(username, note) {
    const formattedUsername = formatUsername(username);
    const url = `https://github-saver-b6274.firebaseio.com/${formattedUsername}.json`;
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(note)
    }).then(res => res.json());
  }
};
