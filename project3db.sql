-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2021 at 10:06 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project3db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `uuid` varchar(150) NOT NULL,
  `firstName` varchar(150) NOT NULL,
  `lastName` varchar(150) NOT NULL,
  `userName` varchar(250) NOT NULL,
  `password` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `uuid`, `firstName`, `lastName`, `userName`, `password`) VALUES
(1, '986afe26-eea9-440e-b488-c7e6efcdd992', 'Niv', 'Rozenberg', 'Nivro', '74a9ed7b1eb0e7ec51d436a03be0afbc827893930b19dc73eca485da2ee4e3014ab550f1736be9ef599f328cae3e5ea92a5004c8b9d8ea7f084636c528a3e651'),
(2, '734c5d6b-53e2-474f-a582-f30006e52d80', 'Nitsan', 'Gal', 'Nits1993', 'db360f66fce31c6e0836b532fc4a17dd1724cee5da3c67c0e7998f9f8d3b03c2a48ffbcb165b252b3b86f27da265e79c5f0c3e31a44033cf1d2c1c04e4ef332b'),
(3, '9ba2daa0-f541-4c32-9d26-20a33a642325', 'Itay', 'Azulay', 'ItayA', '0a2046198b2051ca9a5b6e3959e0a33a59d8ad81b10b63bcc6f861a2ec36cdefa1b016143f1087a77cda4ac03e02659de413ca28e0ffe43d02bdf1dac4967021'),
(4, 'e9dc271e-2017-404d-a762-e257c2ea2afc', 'Leo', 'Messi', 'Leo10', '560b2090242bdb45cdcce1750c58174f241c569592538e148e87480841387bff6be7fae1ee8a3354d49c173d7718751d28e2b2fc30f014c62ec84f2ebe074136'),
(5, '0889d9b7-137e-4c84-9f29-e062e7dc820c', 'Cristiano ', 'Ronaldo', 'CR7', '63820d0999c813056f2ce7c7607856a247e0b6d62bf9fd6187394141e73636ab1c249454f3f9038e5f01bf7681d4dcfc44334f98f0105baf5217c206227ae391'),
(6, '340c0f4c-cace-4e3c-b5f0-2e96e18a5f04', 'Michael', 'Jordan', 'MJ23', '18a1dd47afc5123c603c14f7464e06d46468c3424ce958fbcecc1bdb3cefd2afbd77b86ec6f25335ac31b9d978e576d2ff36197db12672f8113564e54267f925'),
(7, '377d2176-55c9-4810-a9ba-2061fefe03dd', 'Chris', 'Paul', 'CP3', '3ba12d10732ec7aef1df494c4aed5bc8d798859c81bcad682839c2e2ae706384c8dc00087f939a6810546cb0c835e46d515d0cf8349af592f6855dd5c3175dfa'),
(8, '5313e3fe-ca40-4fc2-bacb-f84658f03f49', 'Steph', 'Curry', 'Shooter', '3c1de6c13eb7e314f99e6cbbc26cd36f8ab26f2f24868caa31cb4dc75b779c275804d6d93aff6bc54213b168a59a11b6368e05d06475ffddebb38be4d1559b91'),
(9, '7d56a222-d009-4ff5-828e-1ea95feae3f8', 'Amit', 'Dobry', 'Amit30', '213d95df3c9173ff71179af8f84b40fefd6b89e9e7173d5a033e5418c1d5be1919f4b17f465bbb037d05f1521ca6b7bdecde12c3e7bdfaa0c84f6f80ec3fbf99'),
(10, 'c37fc09e-dd3b-4674-b052-cc07f83a2686', 'Neymar', 'JR', 'NY10', '3557c7dbd643e6283b82a04c163fd161e5d929942649648fbc6338cc2a370c2553620b78f6796a39dedf188c74760451531381e267402c86713a6fb51a9b8a3d'),
(11, 'e2aeb805-37cb-4ffe-9ce4-0c8cefd7a076', 'Kelly', 'Slater', 'Kelly11', '1858b86f3f3a647595ac7411f443c419bd55d211514e381fde7257c4261b784c2980407bccbe436f0a34fd3607e5ad94e1e35aa41944d1cfbcc71d8aa35e6607'),
(12, '5ecd6571-d600-475d-8008-23283c39fd13', 'Conor', 'Mcgregor', 'Conor100', '2c9277152b056e0f7fb7f5be60f3d786f75a7b773ecd1e94fc2568bbba581fb54b7fa5a9943d35a19af3a2445ac889e6d1689a03ce49a63324ace9815b3f5f38'),
(13, 'd01a5ce0-02e8-4d91-8926-367da09b609c', 'Yossi', 'Benayun', 'Yossi15', '503dbb70f0b8c63101dced9a3b92cc66e24d34720d47b457d160111a19aafc1de1ab686d49ed061106b0c262fe62473409c87ca51ea91c19a85dcb1864d3f059'),
(14, '971f6793-2280-41a6-896d-ebf5d7845c56', 'Nicolo', 'Barella', 'Nicolo23', '8217f63afc21f91255b6241107442f6a5c2d3a51ec298930ba2fbe8da005afebb1c9f58389d9af2d5b93b10ab89af0639f4a315996b45717ea29ecb8b78baca2');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacation_id` int(11) NOT NULL,
  `description` varchar(350) NOT NULL,
  `destination` varchar(350) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` int(11) NOT NULL,
  `followers` int(11) NOT NULL,
  `imageName` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacation_id`, `description`, `destination`, `start_date`, `end_date`, `price`, `followers`, `imageName`) VALUES
(1, 'Casinos', 'Las Vegas', '2021-08-19', '2021-08-28', 1000, 0, NULL),
(2, 'Urbanic,Eiffeltower,Messi', 'Paris', '2021-08-27', '2021-08-28', 500, 0, NULL),
(3, 'Premier League, Big ben', 'London', '2021-09-03', '2021-08-10', 900, 0, NULL),
(4, 'Beach, Night Clubs', 'Madrid', '2021-08-19', '2021-08-27', 500, 0, NULL),
(5, 'Footbal, Museums', 'Berlin', '2021-08-12', '2021-07-29', 250, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vacations_details`
--

CREATE TABLE `vacations_details` (
  `vacation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacation_id`);

--
-- Indexes for table `vacations_details`
--
ALTER TABLE `vacations_details`
  ADD KEY `FK_Vacation_Details` (`vacation_id`),
  ADD KEY `FK_Users_Details` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `vacations_details`
--
ALTER TABLE `vacations_details`
  ADD CONSTRAINT `FK_Users_Details` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FK_Vacation_Details` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
