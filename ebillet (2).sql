-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 28 mai 2023 à 18:27
-- Version du serveur : 10.4.25-MariaDB
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ebillet`
--

-- --------------------------------------------------------

--
-- Structure de la table `billetsvendus`
--

CREATE TABLE `billetsvendus` (
  `id_billetvendu` int(20) NOT NULL,
  `id_evenement` int(11) NOT NULL,
  `id_categoriebillet` int(11) NOT NULL,
  `categoriebillet` varchar(50) NOT NULL,
  `prix` int(15) NOT NULL,
  `nom_acheteur` varchar(50) NOT NULL,
  `prenom_acheteur` varchar(50) NOT NULL,
  `email_acheteur` varchar(50) NOT NULL,
  `whatsapp_acheteur` int(50) NOT NULL,
  `date_achat` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `categoriesbillet`
--

CREATE TABLE `categoriesbillet` (
  `id_categoriesbillet` int(11) NOT NULL,
  `id_evenement` int(11) NOT NULL,
  `categoriebillet` varchar(50) NOT NULL,
  `prix` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categoriesbillet`
--

INSERT INTO `categoriesbillet` (`id_categoriesbillet`, `id_evenement`, `categoriebillet`, `prix`) VALUES
(1, 1, 'Simple', 5000),
(2, 1, 'Access', 10000),
(3, 1, 'On Stage', 25000),
(10, 1, 'Ultra VIP', 45000),
(11, 10, 'Simple', 4000),
(12, 10, 'Access', 7000),
(13, 10, 'On Stage', 15000),
(14, 10, 'Ultra VIP', 25000),
(15, 22, 'Simple', 5000),
(16, 14, 'Access', 10000),
(17, 15, 'On Stage', 25000),
(18, 20, 'Ultra VIP', 45000),
(19, 12, 'Simple', 4000),
(20, 16, 'Access', 7000),
(21, 13, 'On Stage', 15000),
(22, 19, 'Ultra VIP', 25000),
(23, 23, 'Simple', 5000),
(24, 17, 'Access', 10000),
(25, 21, 'On Stage', 25000),
(26, 18, 'Ultra VIP', 45000),
(27, 18, 'Simple', 4000),
(28, 21, 'Access', 7000),
(29, 17, 'On Stage', 15000),
(30, 23, 'Ultra VIP', 25000);

-- --------------------------------------------------------

--
-- Structure de la table `categoriesevenement`
--

CREATE TABLE `categoriesevenement` (
  `id_categorieevenement` int(11) NOT NULL,
  `categorieevenement` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `categoriesevenement`
--

INSERT INTO `categoriesevenement` (`id_categorieevenement`, `categorieevenement`) VALUES
(12, 'Concerts'),
(13, 'Brunchs'),
(14, 'SéminairesDivers'),
(15, 'Sports'),
(16, 'Divers'),
(17, 'Fêtes'),
(18, 'Tours'),
(19, 'Galas');

-- --------------------------------------------------------

--
-- Structure de la table `evenements`
--

CREATE TABLE `evenements` (
  `id_evenement` int(11) NOT NULL,
  `id_categorieevenement` int(11) NOT NULL,
  `id_organisateur` int(11) NOT NULL,
  `evenement` varchar(50) NOT NULL,
  `ville` varchar(50) NOT NULL,
  `lieu` varchar(50) NOT NULL,
  `date` datetime(6) NOT NULL,
  `illustration` varchar(50) NOT NULL,
  `description` varchar(300) NOT NULL,
  `onspot` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `evenements`
--

INSERT INTO `evenements` (`id_evenement`, `id_categorieevenement`, `id_organisateur`, `evenement`, `ville`, `lieu`, `date`, `illustration`, `description`, `onspot`) VALUES
(1, 12, 1, 'Pop Show 3', 'Port-Gentil', 'Canal Olympia', '2023-06-19 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 1),
(10, 12, 10, 'Pop Show 4', 'Libreville', 'Institut francais', '2023-05-29 19:30:00.000000', 'Pop-Show-4.png', 'Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes.', 0),
(12, 15, 13, 'Finale inter-lycées', 'Lambaréné', 'Collège Adiwa', '2023-06-23 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(13, 16, 1, 'Madagascar 2', 'Port-Gentil', 'Canal Olympia', '2023-06-20 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(14, 13, 1, 'Brunch: ComiDinner', 'Moanda', 'Salle polyvalente', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 1),
(15, 14, 1, 'Coaching Business', 'Franceville', 'Hotel de ville', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(16, 19, 13, 'Gala pour éducation', 'Franceville', 'Marché de Potoss', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(17, 18, 1, 'Randonnée fluviale', 'Omboué', 'Préfecture', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 1),
(18, 15, 1, 'USO vs CSB', 'Oyem', 'Stade Akouakam', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(19, 14, 1, 'Masterclass leadership', 'Port-Gentil', 'Foire Municipale', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(20, 16, 10, 'Film S.Montparnasse', 'Libreville', 'Cinéma le Komoh', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(21, 17, 10, 'Soirée bacheliers', 'Port-Gentil', 'Diamant night club', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 1),
(22, 15, 13, 'Boxe: T.Mabicka', 'Port-Gentil', 'Stade Michel Essonghe', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(23, 19, 10, 'Nuit des etoiles', 'Libreville', 'Institut francais', '2023-06-29 19:30:00.000000', 'Pop-Show-4.png', 'Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes.', 1);

-- --------------------------------------------------------

--
-- Structure de la table `organisateurs`
--

CREATE TABLE `organisateurs` (
  `id_organisateur` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `organisateurs`
--

INSERT INTO `organisateurs` (`id_organisateur`, `email`, `password`) VALUES
(1, 'yohanndian@gmail.com', 'YohannObiang'),
(10, 'yohannobiang@gmail.com', 'yohannobiang'),
(13, 'boloyoung@gmail.com', 'boloyoung');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `billetsvendus`
--
ALTER TABLE `billetsvendus`
  ADD PRIMARY KEY (`id_billetvendu`) USING BTREE,
  ADD KEY `id_evenement` (`id_evenement`),
  ADD KEY `id_categoriebillet` (`id_categoriebillet`);

--
-- Index pour la table `categoriesbillet`
--
ALTER TABLE `categoriesbillet`
  ADD PRIMARY KEY (`id_categoriesbillet`),
  ADD KEY `id_evenement` (`id_evenement`);

--
-- Index pour la table `categoriesevenement`
--
ALTER TABLE `categoriesevenement`
  ADD PRIMARY KEY (`id_categorieevenement`);

--
-- Index pour la table `evenements`
--
ALTER TABLE `evenements`
  ADD PRIMARY KEY (`id_evenement`),
  ADD KEY `id_categorieevenement` (`id_categorieevenement`),
  ADD KEY `id_categorieevenement_2` (`id_categorieevenement`),
  ADD KEY `id_organisateur` (`id_organisateur`);

--
-- Index pour la table `organisateurs`
--
ALTER TABLE `organisateurs`
  ADD PRIMARY KEY (`id_organisateur`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `billetsvendus`
--
ALTER TABLE `billetsvendus`
  MODIFY `id_billetvendu` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `categoriesbillet`
--
ALTER TABLE `categoriesbillet`
  MODIFY `id_categoriesbillet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `categoriesevenement`
--
ALTER TABLE `categoriesevenement`
  MODIFY `id_categorieevenement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `evenements`
--
ALTER TABLE `evenements`
  MODIFY `id_evenement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `organisateurs`
--
ALTER TABLE `organisateurs`
  MODIFY `id_organisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `billetsvendus`
--
ALTER TABLE `billetsvendus`
  ADD CONSTRAINT `billetsvendus_ibfk_1` FOREIGN KEY (`id_evenement`) REFERENCES `evenements` (`id_evenement`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `billetsvendus_ibfk_2` FOREIGN KEY (`id_categoriebillet`) REFERENCES `categoriesbillet` (`id_categoriesBillet`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `categoriesbillet`
--
ALTER TABLE `categoriesbillet`
  ADD CONSTRAINT `categoriesbillet_ibfk_1` FOREIGN KEY (`id_evenement`) REFERENCES `evenements` (`id_evenement`);

--
-- Contraintes pour la table `evenements`
--
ALTER TABLE `evenements`
  ADD CONSTRAINT `evenements_ibfk_1` FOREIGN KEY (`id_organisateur`) REFERENCES `organisateurs` (`id_organisateur`),
  ADD CONSTRAINT `evenements_ibfk_2` FOREIGN KEY (`id_categorieevenement`) REFERENCES `categoriesevenement` (`id_categorieevenement`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
