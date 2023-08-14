-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 08 juin 2023 à 15:27
-- Version du serveur : 8.0.33
-- Version de PHP : 7.4.3-4ubuntu2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `obisto`
--

-- --------------------------------------------------------

--
-- Structure de la table `billetsvendus`
--

CREATE TABLE `billetsvendus` (
  `id_billetvendu` int NOT NULL,
  `id_evenement` int NOT NULL,
  `id_categoriebillet` int NOT NULL,
  `categoriebillet` varchar(50) NOT NULL,
  `prix` int NOT NULL,
  `nom_acheteur` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `prenom_acheteur` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email_acheteur` varchar(50) NOT NULL,
  `whatsapp_acheteur` int DEFAULT NULL,
  `date_achat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `validity` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `billetsvendus`
--

INSERT INTO `billetsvendus` (`id_billetvendu`, `id_evenement`, `id_categoriebillet`, `categoriebillet`, `prix`, `nom_acheteur`, `prenom_acheteur`, `email_acheteur`, `whatsapp_acheteur`, `date_achat`, `validity`) VALUES
(116, 1, 3, 'On Stage', 25000, '2345', 'sd', 'eliejrbil@gmail.com', 12421, '2023-06-07 18:52:59', 0),
(117, 1, 3, 'On Stage', 25000, 'OBIANG', 'Yohann Dian', 'yohanndian@gmail.com', 77482253, '2023-06-07 18:05:23', 0),
(118, 1, 2, 'Access', 10000, 'sdgggsd', 'dgsdsd', 'yohanndian@gmail.com', 65465, '2023-06-08 11:09:33', 0),
(119, 1, 10, 'Ultra VIP', 45000, 'sdfsdfsdf', 'sdfsdfsdf', 'eliejrbil@gmail.com', 646, '2023-06-08 11:12:00', 0),
(120, 1, 10, 'Ultra VIP', 45000, 'MOMBO', 'jhbkjj', 'yohanndian@gmail.com', 252353, '2023-06-08 13:18:13', 1),
(121, 1, 1, 'Simple', 5000, 'rsdgsk', 'jhbkjj', 'yohanndian@gmail.com', 1234, '2023-06-08 13:26:20', 1);

-- --------------------------------------------------------

--
-- Structure de la table `categoriesbillet`
--

CREATE TABLE `categoriesbillet` (
  `id_categoriesbillet` int NOT NULL,
  `id_evenement` int NOT NULL,
  `categoriebillet` varchar(50) NOT NULL,
  `prix` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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
  `id_categorieevenement` int NOT NULL,
  `categorieevenement` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `id_evenement` int NOT NULL,
  `id_categorieevenement` int NOT NULL,
  `id_organisateur` int NOT NULL,
  `evenement` varchar(50) NOT NULL,
  `ville` varchar(50) NOT NULL,
  `lieu` varchar(50) NOT NULL,
  `date` datetime(6) NOT NULL,
  `illustration` varchar(50) NOT NULL,
  `description` varchar(300) NOT NULL,
  `onspot` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `evenements`
--

INSERT INTO `evenements` (`id_evenement`, `id_categorieevenement`, `id_organisateur`, `evenement`, `ville`, `lieu`, `date`, `illustration`, `description`, `onspot`) VALUES
(1, 12, 1, 'Pop Show 3', 'Port-Gentil', 'Canal Olympia', '2023-06-19 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 1),
(10, 12, 10, 'Pop Show 4', 'Libreville', 'Institut francais', '2023-05-29 19:30:00.000000', 'pop-show-4.png', 'Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes.', 0),
(12, 15, 13, 'Finale inter-lycées', 'Lambaréné', 'Collège Adiwa', '2023-06-23 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(13, 16, 14, 'Madagascar 2', 'Port-Gentil', 'Canal Olympia', '2023-06-20 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(14, 13, 19, 'Brunch: ComiDinner', 'Moanda', 'Salle polyvalente', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 1),
(15, 14, 15, 'Coaching Business', 'Franceville', 'Hotel de ville', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(16, 19, 16, 'Gala pour éducation', 'Franceville', 'Marché de Potoss', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(17, 18, 17, 'Randonnée fluviale', 'Omboué', 'Préfecture', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 1),
(18, 15, 18, 'USO vs CSB', 'Oyem', 'Stade Akouakam', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(19, 14, 20, 'Masterclass leadership', 'Port-Gentil', 'Foire Municipale', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(20, 16, 21, 'Film S.Montparnasse', 'Libreville', 'Cinéma le Komoh', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(21, 17, 22, 'Soirée bacheliers', 'Port-Gentil', 'Diamant night club', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 1),
(22, 15, 23, 'Boxe: T.Mabicka', 'Port-Gentil', 'Stade Michel Essonghe', '2023-06-29 19:30:00.000000', 'pop-show-3.png', 'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes.', 0),
(23, 19, 24, 'Nuit des etoiles', 'Libreville', 'Institut francais', '2023-06-29 19:30:00.000000', 'pop-show-4.png', 'Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes.', 1);

-- --------------------------------------------------------

--
-- Structure de la table `organisateurs`
--

CREATE TABLE `organisateurs` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `solde` int NOT NULL DEFAULT '0',
  `numero_retraits` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '0000000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `organisateurs`
--

INSERT INTO `organisateurs` (`id`, `username`, `password`, `solde`, `numero_retraits`) VALUES
(1, 'yohanndian@gmail.com', 'YohannObiang', 155000, '077482253'),
(10, 'yohannobiang@gmail.com', 'yohannobiang', 0, '0000000'),
(13, 'boloyoung@gmail.com', 'boloyoung', 0, '0000000'),
(14, 'yohann@gmail.com', 'yohann', 0, '0000000'),
(15, 'obiang@gmail.com', 'obiang', 0, '0000000'),
(16, 'bolo@gmail.com', 'bolo', 0, '0000000'),
(17, 'dian@gmail.com', 'dian', 0, '0000000'),
(18, 'young@gmail.com', 'young', 0, '0000000'),
(19, 'boloyoung2@gmail.com', 'boloyoung2', 0, '0000000'),
(20, 'yohann2@gmail.com', 'yohann2', 0, '0000000'),
(21, 'obiang2@gmail.com', 'obiang2', 0, '0000000'),
(22, 'bolo2@gmail.com', 'bolo2', 0, '0000000'),
(23, 'dian2@gmail.com', 'dian2', 0, '0000000'),
(24, 'young2@gmail.com', 'young2', 0, '0000000');

-- --------------------------------------------------------

--
-- Structure de la table `retraits`
--

CREATE TABLE `retraits` (
  `id_retrait` int NOT NULL,
  `id` int NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `somme` int NOT NULL,
  `solde` int NOT NULL,
  `nouveau_solde` int NOT NULL,
  `statut` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'En cours'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `retraits`
--

INSERT INTO `retraits` (`id_retrait`, `id`, `date`, `somme`, `solde`, `nouveau_solde`, `statut`) VALUES
(20, 1, '2023-06-08 12:20:27', 5000, 10000, 5000, 'En cours');

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
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `retraits`
--
ALTER TABLE `retraits`
  ADD PRIMARY KEY (`id_retrait`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `billetsvendus`
--
ALTER TABLE `billetsvendus`
  MODIFY `id_billetvendu` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT pour la table `categoriesbillet`
--
ALTER TABLE `categoriesbillet`
  MODIFY `id_categoriesbillet` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `categoriesevenement`
--
ALTER TABLE `package`
  MODIFY `id_categorieevenement` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `evenements`
--
ALTER TABLE `package`
  MODIFY `package_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
  MODIFY `active_delivery_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `organisateurs`
--
ALTER TABLE `organisateurs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `retraits`
--
ALTER TABLE `retraits`
  MODIFY `id_retrait` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `billetsvendus`
--
ALTER TABLE `billetsvendus`
  ADD CONSTRAINT `billetsvendus_ibfk_1` FOREIGN KEY (`id_evenement`) REFERENCES `evenements` (`id_evenement`),
  ADD CONSTRAINT `billetsvendus_ibfk_2` FOREIGN KEY (`id_categoriebillet`) REFERENCES `categoriesbillet` (`id_categoriesbillet`);

--
-- Contraintes pour la table `categoriesbillet`
--
ALTER TABLE `categoriesbillet`
  ADD CONSTRAINT `categoriesbillet_ibfk_1` FOREIGN KEY (`id_evenement`) REFERENCES `evenements` (`id_evenement`);

--
-- Contraintes pour la table `evenements`
--
ALTER TABLE `evenements`
  ADD CONSTRAINT `evenements_ibfk_1` FOREIGN KEY (`id_organisateur`) REFERENCES `organisateurs` (`id`),
  ADD CONSTRAINT `evenements_ibfk_2` FOREIGN KEY (`id_categorieevenement`) REFERENCES `categoriesevenement` (`id_categorieevenement`);

--
-- Contraintes pour la table `retraits`
--
ALTER TABLE `retraits`
  ADD CONSTRAINT `retraits_ibfk_1` FOREIGN KEY (`id`) REFERENCES `organisateurs` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
