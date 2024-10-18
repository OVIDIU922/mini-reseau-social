document.addEventListener("DOMContentLoaded", () => {
  // Chargement des posts
  const posts = [
    {
      "id": 1,
      "user": "Daniela",
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
      "comments": [{"user": "Daniela", "text": "Je suis d'accord !"}]
    }
  ];

  const postsContainer = document.getElementById('posts-container');
  
  posts.forEach(post => {
    const postDiv = createPostElement(post);
    const commentSection = createCommentSection(post);
    postDiv.appendChild(commentSection);
    postsContainer.appendChild(postDiv);
  });

  function createPostElement(post) {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
    
      // User
      const userDiv = document.createElement('h3');
      userDiv.textContent = post.user;
      postDiv.appendChild(userDiv);
    
      // Text
      const textDiv = document.createElement('p');
      textDiv.textContent = post.text;
      postDiv.appendChild(textDiv);
    
      // Image
      if (post.image) {
        const img = document.createElement('img');
        img.src = post.image;
        postDiv.appendChild(img);
      }

      // Reactions
      const reactionsDiv = document.createElement('div');
      reactionsDiv.classList.add('reactions');

      const likeButton = createReactionButton('like', post.reactions.like, '👍');
      const loveButton = createReactionButton('love', post.reactions.love, '❤️');
      const dislikeButton = createReactionButton('dislike', post.reactions.dislike, '👎');

      reactionsDiv.appendChild(likeButton);
      reactionsDiv.appendChild(loveButton);
      reactionsDiv.appendChild(dislikeButton);

      postDiv.appendChild(reactionsDiv);

      return postDiv;
  }

  function createReactionButton(type, count, emoji) {
      const button = document.createElement('button');
      button.innerHTML = `${emoji} ${count}`;
      button.onclick = () => {
          count++;
          button.innerHTML = `${emoji} ${count}`;
      };
      return button;
  }

  // Section des commentaires
  function createCommentSection(post) {
      const commentSection = document.createElement('div');
      commentSection.classList.add('comment-section');
  
      post.comments.forEach(comment => {
          const commentDiv = document.createElement('p');
          commentDiv.classList.add('comment');
          commentDiv.textContent = `${comment.user}: ${comment.text}`;
          commentSection.appendChild(commentDiv);
      });
  
      const commentInput = document.createElement('input');
      commentInput.type = 'text';
      commentInput.placeholder = 'Ajouter un commentaire...';
      commentSection.appendChild(commentInput);
  
      const commentButton = document.createElement('button');
      commentButton.textContent = 'Commenter';
      commentButton.onclick = () => {
          if (commentInput.value.trim() !== '') {
              const newComment = {
                  user: "Daniela",
                  text: commentInput.value
              };
              post.comments.push(newComment);
              const commentDiv = document.createElement('p');
              commentDiv.classList.add('comment');
              commentDiv.textContent = `${newComment.user}: ${newComment.text}`;
              commentSection.insertBefore(commentDiv, commentInput);
              commentInput.value = '';
          }
      };
      commentSection.appendChild(commentButton);
  
      return commentSection;
  }
});


// Fonction pour charger les données des conversations
async function loadConversations() {
  const response = await fetch('conversations.json'); // Charger le fichier JSON
  const conversations = await response.json(); // Parser le JSON

  const conversationsContainer = document.getElementById('conversations-container');

  conversations.forEach(conv => {
      const convDiv = document.createElement('div');
      convDiv.classList.add('conversation');
      convDiv.textContent = conv.participants.join(', '); // Affiche les participants
      convDiv.addEventListener('click', () => loadMessages(conv));
      conversationsContainer.appendChild(convDiv);
  });
}

// Fonction pour charger les messages d'une conversation
function loadMessages(conv) {
  const chatHistory = document.getElementById('chat-history');
  chatHistory.innerHTML = ''; // Effacer l'historique

  conv.messages.forEach(msg => {
      const messageDiv = document.createElement('div');
      messageDiv.textContent = `${msg.user} (${msg.timestamp}): ${msg.text}`;
      chatHistory.appendChild(messageDiv);
  });

  // Gérer l'envoi de messages
  const messageInput = document.getElementById('message-input');
  const sendMessageButton = document.getElementById('send-message');

  sendMessageButton.onclick = () => {
      const newMessage = {
          user: "Daniela", // Remplacez par l'utilisateur actuel
          text: messageInput.value,
          timestamp: new Date().toLocaleTimeString() // Obtenir l'heure actuelle
      };

      if (newMessage.text) {
          conv.messages.push(newMessage); // Ajouter le message à la conversation
          loadMessages(conv); // Recharger les messages
          messageInput.value = ''; // Effacer le champ de saisie
      }
  };
}

// Appeler la fonction pour charger les conversations au chargement de la page
document.addEventListener("DOMContentLoaded", loadConversations);


// Liste d'amis //
const friends = [
  { id: 1, name: 'Daniela' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

// Afficher la liste des amis
function displayFriends(friends) {
  const friendList = document.getElementById('friend-list');
  friendList.innerHTML = ''; // Effacer la liste existante

  friends.forEach(friend => {
      const li = document.createElement('li');
      li.draggable = true;
      li.textContent = friend.name;
      li.setAttribute('data-name', friend.name);

      // Lien vers la messagerie
      li.addEventListener('click', () => {
          alert(`Accéder à la messagerie avec ${friend.name}`);
      });

      // Événements pour le drag and drop
      li.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', friend.id);
      });

      friendList.appendChild(li);
  });
}

// Filtrer les amis par nom
function filterFriends() {
  const searchTerm = document.getElementById('search-friends').value.toLowerCase();
  const filteredFriends = friends.filter(friend => friend.name.toLowerCase().includes(searchTerm));
  displayFriends(filteredFriends);
}

document.getElementById('search-friends').addEventListener('input', filterFriends);

// Chargement initial de la liste d'amis
displayFriends(friends);

// Pour le drag and drop
const friendList = document.getElementById('friend-list');

friendList.addEventListener('dragover', (e) => {
  e.preventDefault(); // Permettre le drop
});

friendList.addEventListener('drop', (e) => {
  e.preventDefault();
  const draggedId = e.dataTransfer.getData('text/plain');
  const draggedFriend = friends.find(friend => friend.id == draggedId);
  const targetFriend = e.target;

  if (targetFriend.tagName === 'LI') {
      // Réorganiser la liste
      const draggedIndex = friends.indexOf(draggedFriend);
      const targetIndex = Array.from(friendList.children).indexOf(targetFriend);

      // Échanger les amis dans le tableau
      friends.splice(draggedIndex, 1);
      friends.splice(targetIndex, 0, draggedFriend);

      // Réafficher la liste d'amis
      displayFriends(friends);
  }
});
