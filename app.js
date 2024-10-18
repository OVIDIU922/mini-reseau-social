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

    
    // Fonction pour créer la section des commentaires
    function createCommentSection(post) {
        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');
    
        // Affichage des commentaires existants
        post.comments.forEach(comment => {
        const commentDiv = document.createElement('p');
        commentDiv.classList.add('comment');
        commentDiv.textContent = `${comment.user}: ${comment.text}`;
        commentSection.appendChild(commentDiv);
        });
    
        // Input pour ajouter un nouveau commentaire
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Ajouter un commentaire...';
        commentSection.appendChild(commentInput);
    
        // Bouton pour ajouter le commentaire
        const commentButton = document.createElement('button');
        commentButton.textContent = 'Commenter';
        commentButton.onclick = () => {
        if (commentInput.value.trim() !== '') {
            const newComment = {
            user: "Alice", // L'utilisateur actuel
            text: commentInput.value
            };
            post.comments.push(newComment); // Ajouter le nouveau commentaire à la liste
            const commentDiv = document.createElement('p');
            commentDiv.classList.add('comment');
            commentDiv.textContent = `${newComment.user}: ${newComment.text}`;
            commentSection.appendChild(commentDiv); // Afficher le nouveau commentaire
            commentInput.value = ''; // Réinitialiser le champ après soumission
        }
        };
        commentSection.appendChild(commentButton);
    
        return commentSection;
    }
     // Ajout des réactions aux posts (Like / Dislike / Love)
  function createPostElement(post) {
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
  
    // Section des réactions
    const reactionsDiv = document.createElement('div');
    reactionsDiv.classList.add('reactions');
  
    // Boutons de réaction
    const likeButton = createReactionButton('like', post.reactions.like);
    const loveButton = createReactionButton('love', post.reactions.love);
    const dislikeButton = createReactionButton('dislike', post.reactions.dislike);
  
    reactionsDiv.appendChild(likeButton);
    reactionsDiv.appendChild(loveButton);
    reactionsDiv.appendChild(dislikeButton);
    
    postDiv.appendChild(reactionsDiv);
  
    return postDiv;
  }
  
  // Ajout de la section des commentaires dans le post
  posts.forEach(post => {
    const postDiv = createPostElement(post);
    
    const commentSection = createCommentSection(post);
    postDiv.appendChild(commentSection);
    
    postsContainer.appendChild(postDiv);
  });
  
  
  // Fonction pour créer les boutons de réaction
    function createReactionButton(type, count, postDiv) {
        const button = document.createElement('button');
        button.classList.add(type);
        button.innerHTML = `${type} (${count})`;
    
        button.onclick = () => {
        // Incrémenter le compteur de la réaction
        count++;
        button.innerHTML = `${type} (${count})`;
    
        // Ajouter une animation de particules au post spécifique
        showReactionParticles(type, postDiv);
        };
    
        return button;
    }  

  // Fonction pour afficher des particules sur le post spécifique
    function showReactionParticles(type, postDiv) {
        const particlesDiv = document.createElement('div');
        particlesDiv.classList.add('particles', type);
        
        postDiv.appendChild(particlesDiv); // Ajouter les particules au post spécifique

        // Animation qui disparaît après un court délai
        setTimeout(() => {
        particlesDiv.remove();
        }, 1000);
    }
  

   // affichera une liste de conversations
   const conversations = [
    {
      "id": 1,
      "participants": ["Alice", "Bob"],
      "messages": [
        {"user": "Alice", "text": "Salut Bob!", "timestamp": "10:30"},
        {"user": "Bob", "text": "Salut Alice!", "timestamp": "10:31"}
      ]
    },
    {
      "id": 2,
      "participants": ["Alice", "Charlie"],
      "messages": [
        {"user": "Alice", "text": "Hello Charlie!", "timestamp": "10:40"},
        {"user": "Charlie", "text": "Hey Alice!", "timestamp": "10:41"}
      ]
    }
  ];
  
  // Affichage de la liste des conversations
  const conversationsContainer = document.getElementById('conversations-container');
  conversations.forEach(conversation => {
    const conversationDiv = document.createElement('div');
    conversationDiv.classList.add('conversation');
    conversationDiv.textContent = `Conversation avec ${conversation.participants.join(', ')}`;
  
    conversationDiv.onclick = () => {
      displayChat(conversation);
    };
  
    conversationsContainer.appendChild(conversationDiv);
  });
  
  // Affichage de l'historique des messages
  function displayChat(conversation) {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = ''; // On efface le contenu précédent
  
    conversation.messages.forEach(message => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.textContent = `${message.user} (${message.timestamp}): ${message.text}`;
      
      chatContainer.appendChild(messageDiv);
    });
  
    // Ajouter la possibilité d'envoyer de nouveaux messages
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Envoyer un message...';
    chatContainer.appendChild(input);
  
    const sendButton = document.createElement('button');
    sendButton.textContent = 'Envoyer';
    sendButton.onclick = () => {
      const newMessage = {
        user: "Alice", // L'utilisateur actuel
        text: input.value,
        timestamp: new Date().toLocaleTimeString()
      };
      conversation.messages.push(newMessage);
      displayChat(conversation); // Réafficher la conversation
    };
  
    chatContainer.appendChild(sendButton);
  }

  // Gestion de la liste d’amis avec Drag and Drop
  const friendsList = document.getElementById('friend-list');
    let draggedItem = null;

    friendsList.addEventListener('dragstart', (e) => {
    draggedItem = e.target;
    });

    friendsList.addEventListener('dragover', (e) => {
    e.preventDefault(); // Nécessaire pour permettre le drop
    });

    friendsList.addEventListener('drop', (e) => {
    if (e.target.tagName === 'LI' && draggedItem !== e.target) {
        friendsList.insertBefore(draggedItem, e.target);
    }
    });
  
});

  
  