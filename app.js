document.addEventListener("DOMContentLoaded", () => {
    // Simulation du chargement de posts depuis un fichier JSON
    const posts = [
      {
        "id": 1,
        "user": "Alice",
        "text": "Voici mon premier post!",
        "image": "images/pexels-photo-.jpeg",
        "reactions": {"like": 10, "love": 5, "dislike": 2},
        "comments": [{"user": "Bob", "text": "Super post !"}]
      },
      {
        "id": 2,
        "user": "Bob",
        "text": "Quelle belle journée !",
        "image": null,
        "reactions": {"like": 7, "love": 2, "dislike": 1},
        "comments": [{"user": "Alice", "text": "Je suis d'accord !"}]
      }
    ];
  
    const postsContainer = document.getElementById('posts-container');
    
    posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
  
      // Titre de l'utilisateur
      const userDiv = document.createElement('h3');
      userDiv.textContent = post.user;
      postDiv.appendChild(userDiv);
  
      // Texte du post
      const textDiv = document.createElement('p');
      textDiv.textContent = post.text;
      postDiv.appendChild(textDiv);
  
      // Image du post
      if (post.image) {
        const img = document.createElement('img');
        img.src = post.image;
        postDiv.appendChild(img);
      }
  
      postsContainer.appendChild(postDiv);
    });
  });
  