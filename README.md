# 🎨 Portfolio Ezzouek Hamza - Développeur Full-Stack

Portfolio personnel moderne et professionnel créé avec ReactJS, TailwindCSS et Framer Motion.

![Portfolio Preview](./preview.png)

## 🚀 Technologies utilisées

- **ReactJS** (Vite) - Framework JavaScript
- **TailwindCSS** - Framework CSS utilitaire
- **Framer Motion** - Bibliothèque d'animations
- **React Icons** - Icônes
- **EmailJS** - Service d'envoi d'emails
- **ESLint** - Linter JavaScript

## ✨ Fonctionnalités

- ✅ Design moderne et responsive (mobile-first)
- ✅ Mode sombre / clair
- ✅ Animations fluides avec Framer Motion
- ✅ Navbar sticky avec menu mobile
- ✅ Section Hero avec gradient animé
- ✅ Filtrage des projets par catégorie
- ✅ Formulaire de contact fonctionnel (EmailJS)
- ✅ Barre de progression du scroll
- ✅ Loader animé au chargement
- ✅ Effets glassmorphism
- ✅ Hover effects avancés
- ✅ SEO optimisé
- ✅ Performance optimisée

## 📁 Structure du projet

```
portfolio-14012026/
├── public/
├── src/
│   ├── assets/
│   │   └── image.png          # Photo de profil
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation
│   │   ├── Hero.jsx           # Section d'accueil
│   │   ├── About.jsx          # À propos
│   │   ├── Skills.jsx         # Compétences
│   │   ├── Projects.jsx       # Projets
│   │   ├── Contact.jsx        # Contact
│   │   ├── Footer.jsx         # Pied de page
│   │   ├── Loader.jsx         # Loader animé
│   │   └── ScrollProgress.jsx # Barre de progression
│   ├── data/
│   │   └── portfolioData.js   # Données du portfolio
│   ├── App.jsx                # Composant principal
│   ├── main.jsx               # Point d'entrée
│   └── index.css              # Styles globaux
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🛠️ Installation

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/portfolio.git
cd portfolio-14012026
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer EmailJS** (optionnel)
   - Créer un compte sur [EmailJS](https://www.emailjs.com/)
   - Créer un service email
   - Créer un template d'email
   - Remplacer les clés dans `src/components/Contact.jsx`:
     ```javascript
     await emailjs.send(
       'YOUR_SERVICE_ID',    // Votre Service ID
       'YOUR_TEMPLATE_ID',   // Votre Template ID
       {...},
       'YOUR_PUBLIC_KEY'     // Votre Public Key
     );
     ```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

5. **Ouvrir dans le navigateur**
   - L'application sera disponible sur `http://localhost:5173`

## 📦 Build pour la production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

## 🎨 Personnalisation

### Modifier les informations personnelles

Éditer le fichier `src/data/portfolioData.js` pour mettre à jour :
- Informations personnelles
- Compétences
- Projets
- Certifications
- Langues
- Centres d'intérêt
- Liens des réseaux sociaux

### Changer les couleurs

Modifier le fichier `tailwind.config.js` pour personnaliser les couleurs du thème.

### Ajouter/Modifier des sections

Les composants sont modulaires et peuvent être facilement modifiés dans le dossier `src/components/`.

## 📱 Responsive Design

Le portfolio est entièrement responsive et optimisé pour :
- 📱 Mobile (320px - 767px)
- 📱 Tablette (768px - 1023px)
- 💻 Desktop (1024px+)

## 🌐 Déploiement

### Vercel (Recommandé)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Glisser-déposer le dossier dist/ sur Netlify
```

### GitHub Pages
```bash
npm run build
# Configurer GitHub Pages pour servir depuis le dossier dist/
```

## 📝 Scripts disponibles

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Créer le build de production
- `npm run preview` - Prévisualiser le build de production
- `npm run lint` - Vérifier le code avec ESLint

## 🎯 Fonctionnalités à venir

- [ ] Blog intégré
- [ ] Système de commentaires
- [ ] Multilingue (FR/EN/AR)
- [ ] Animations 3D avec Three.js
- [ ] Mode offline (PWA)

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et de le modifier.

## 👤 Auteur

**Ezzouek Hamza**
- Email: ezouekhamza2411@gmail.com
- Téléphone: +212 640 347045
- Localisation: Casablanca, Maroc
- GitHub: [@ezzouekhamza](https://github.com/ezzouekhamza)
- LinkedIn: [Ezzouek Hamza](https://linkedin.com/in/ezzouekhamza)

## 🙏 Remerciements

- [ReactJS](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [EmailJS](https://www.emailjs.com/)
- [Unsplash](https://unsplash.com/) pour les images

---

⭐ N'hésitez pas à mettre une étoile si vous aimez ce projet !
