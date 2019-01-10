-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2018 at 04:46 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prognosticdb`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `deletePerson` (IN `s_id` INT(11))  BEGIN   
           DELETE FROM person WHERE Id = s_id;  
           END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectPerson` ()  BEGIN  
      SELECT * FROM person ORDER BY id DESC;  
      END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePerson` (`s_id` INT(11), `Name` VARCHAR(17), `Salary` INT(11), `Social` DECIMAL(3,2), `Increment` DECIMAL(2,1))  BEGIN   
                UPDATE Person SET Name = Name, Salary = Salary , SocialFactor = Social , IncrementFactor = Increment  
                WHERE Id = s_id;  
                END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `wherePerson` (IN `user_id` INT(11))  BEGIN   
      SELECT * FROM Person ;  
      END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `allocation`
--

CREATE TABLE `allocation` (
  `Id` int(11) NOT NULL,
  `PersonId` int(11) NOT NULL,
  `ProjectId` int(11) NOT NULL,
  `Percentage` decimal(4,1) NOT NULL,
  `StartDate` varchar(10) NOT NULL,
  `EndDate` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `allocation`
--

INSERT INTO `allocation` (`Id`, `PersonId`, `ProjectId`, `Percentage`, `StartDate`, `EndDate`) VALUES
(8, 10, 1, '100.0', '2018-07-01', '2020-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `costs`
--

CREATE TABLE `costs` (
  `Id` int(11) DEFAULT NULL,
  `ProjectId` int(11) DEFAULT NULL,
  `Date` varchar(10) DEFAULT NULL,
  `ExternalSalary` int(11) DEFAULT NULL,
  `ExternalOverhead` int(11) DEFAULT NULL,
  `ExternalOtherCost` int(11) DEFAULT NULL,
  `InternalSalary` int(11) DEFAULT NULL,
  `InternalOverhead` int(11) DEFAULT NULL,
  `InternalOtherCost` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `costs`
--

INSERT INTO `costs` (`Id`, `ProjectId`, `Date`, `ExternalSalary`, `ExternalOverhead`, `ExternalOtherCost`, `InternalSalary`, `InternalOverhead`, `InternalOtherCost`) VALUES
(3, 1, '2018-06-18', 10000, 11000, 12000, 20000, 21000, 22000),
(4, 1, '2018-05-30', 10, 10, 10, 10, 10, 10);

-- --------------------------------------------------------

--
-- Stand-in structure for view `endbalanceview`
-- (See below for the actual view)
--
CREATE TABLE `endbalanceview` (
`Id` int(11)
,`Name` varchar(9)
,`ExternalSalary` decimal(64,5)
,`InternalSalary` decimal(64,5)
,`ExternalOverhead` decimal(65,7)
,`InternalOverhead` decimal(65,7)
,`ExternalOtherCost` bigint(12)
,`InternalOtherCost` bigint(12)
);

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `Id` int(11) NOT NULL,
  `Name` varchar(17) NOT NULL,
  `Salary` int(11) NOT NULL,
  `SocialFactor` decimal(3,2) DEFAULT NULL,
  `IncrementFactor` decimal(2,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`Id`, `Name`, `Salary`, `SocialFactor`, `IncrementFactor`) VALUES
(2, 'Adnan Causevic', 46002, '0.50', '1.5'),
(3, 'Daniel Sundmark', 10003, '0.50', '1.5'),
(4, 'Wasif Afzal', 40001, '0.50', '1.5'),
(5, 'Damir Bilic', 30000, '0.50', '1.5'),
(6, 'Elaine Weyuker', 80000, '0.17', '1.5'),
(7, 'Thomas Ostrand', 40000, '0.17', '1.5'),
(9, 'Sara Abbaspour', 30000, '0.50', '1.5'),
(10, 'Saurabh Tiwari', 30000, '0.50', '1.5'),
(11, 'Nils Müllner', 30000, '0.50', '1.5');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `Id` int(11) NOT NULL,
  `Name` varchar(9) NOT NULL,
  `EndDate` varchar(10) NOT NULL,
  `Stl` int(11) NOT NULL,
  `ExternalSalary` int(11) NOT NULL,
  `ExternalOverhead` int(11) NOT NULL,
  `ExternalOtherCost` int(11) NOT NULL,
  `InternalSalary` int(11) NOT NULL,
  `InternalOverhead` int(11) NOT NULL,
  `InternalOtherCost` int(11) NOT NULL,
  `SpendingExternalSalary` int(11) DEFAULT NULL,
  `SpendingExternalOverhead` int(11) DEFAULT NULL,
  `SpendingExternalOtherCost` int(11) DEFAULT NULL,
  `SpendingInternalSalary` int(11) DEFAULT NULL,
  `SpendingInternalOverhead` int(11) DEFAULT NULL,
  `SpendingInternalOtherCost` int(11) DEFAULT NULL,
  `SpendingDate` varchar(10) DEFAULT NULL,
  `OverheadConstant` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`Id`, `Name`, `EndDate`, `Stl`, `ExternalSalary`, `ExternalOverhead`, `ExternalOtherCost`, `InternalSalary`, `InternalOverhead`, `InternalOtherCost`, `SpendingExternalSalary`, `SpendingExternalOverhead`, `SpendingExternalOtherCost`, `SpendingInternalSalary`, `SpendingInternalOverhead`, `SpendingInternalOtherCost`, `SpendingDate`, `OverheadConstant`) VALUES
(1, 'MegaM@rt2', '2020-03-31', 1, 2419200, 1137024, 372576, 0, 0, 0, 1669612, 710189, 400024, 108557, 125550, 43008, '2018-06-30', '0.75'),
(6, 'EXACT', '2018-01-01', 1, 2280000, 1071600, 248400, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2018-10-10', '0.75'),
(9, 'TESTOMAT', '2018-10-01', 1, 2419200, 1137024, 372576, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', '0.75'),
(10, 'TestMine', '2017-01-01', 1, 2816102, 697126, 702646, 0, 0, 423795, 0, 0, 0, 0, 0, 0, '', '0.40');

-- --------------------------------------------------------

--
-- Stand-in structure for view `remainingview`
-- (See below for the actual view)
--
CREATE TABLE `remainingview` (
`Id` int(11)
,`Name` varchar(9)
,`SpendingDate` varchar(10)
,`ExternalSalary` bigint(12)
,`ExternalOverhead` bigint(12)
,`ExternalOtherCost` bigint(12)
,`InternalSalary` bigint(12)
,`InternalOverhead` bigint(12)
,`InternalOtherCost` bigint(12)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `salarycost`
-- (See below for the actual view)
--
CREATE TABLE `salarycost` (
`ProjectId` int(11)
,`Salary` decimal(63,5)
);

-- --------------------------------------------------------

--
-- Structure for view `endbalanceview`
--
DROP TABLE IF EXISTS `endbalanceview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `endbalanceview`  AS  select `project`.`Id` AS `Id`,`project`.`Name` AS `Name`,(case when ((`project`.`ExternalSalary` + `project`.`InternalSalary`) <> 0) then round((`remainingview`.`ExternalSalary` - ((`project`.`ExternalSalary` / (`project`.`ExternalSalary` + `project`.`InternalSalary`)) * `salarycost`.`Salary`)),2) else (`remainingview`.`ExternalSalary` - `salarycost`.`Salary`) end) AS `ExternalSalary`,(case when ((`project`.`ExternalSalary` + `project`.`InternalSalary`) <> 0) then round((`remainingview`.`InternalSalary` - ((`project`.`InternalSalary` / (`project`.`ExternalSalary` + `project`.`InternalSalary`)) * `salarycost`.`Salary`)),2) else (`remainingview`.`InternalSalary` - `salarycost`.`Salary`) end) AS `InternalSalary`,(case when ((`project`.`ExternalOverhead` + `project`.`InternalOverhead`) <> 0) then round((`remainingview`.`ExternalOverhead` - ((`project`.`ExternalOverhead` / (`project`.`ExternalOverhead` + `project`.`ExternalOverhead`)) * `salarycost`.`Salary`)),2) else (`remainingview`.`ExternalOverhead` - (`project`.`OverheadConstant` * `salarycost`.`Salary`)) end) AS `ExternalOverhead`,(case when ((`project`.`ExternalOverhead` + `project`.`InternalOverhead`) <> 0) then round((`remainingview`.`InternalOverhead` - ((`project`.`InternalOverhead` / (`project`.`ExternalOverhead` + `project`.`InternalOverhead`)) * `salarycost`.`Salary`)),2) else (`remainingview`.`InternalOverhead` - (`project`.`OverheadConstant` * `salarycost`.`Salary`)) end) AS `InternalOverhead`,`remainingview`.`ExternalOtherCost` AS `ExternalOtherCost`,`remainingview`.`InternalOtherCost` AS `InternalOtherCost` from ((`salarycost` join `project` on((`project`.`Id` = `salarycost`.`ProjectId`))) join `remainingview` on((`project`.`Id` = `remainingview`.`Id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `remainingview`
--
DROP TABLE IF EXISTS `remainingview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `remainingview`  AS  select `project`.`Id` AS `Id`,`project`.`Name` AS `Name`,`project`.`SpendingDate` AS `SpendingDate`,(`project`.`ExternalSalary` - ifnull(`project`.`SpendingExternalSalary`,0)) AS `ExternalSalary`,(`project`.`ExternalOverhead` - ifnull(`project`.`SpendingExternalOverhead`,0)) AS `ExternalOverhead`,(`project`.`ExternalOtherCost` - ifnull(`project`.`SpendingExternalOtherCost`,0)) AS `ExternalOtherCost`,(`project`.`InternalSalary` - ifnull(`project`.`SpendingInternalSalary`,0)) AS `InternalSalary`,(`project`.`InternalOverhead` - ifnull(`project`.`SpendingInternalOverhead`,0)) AS `InternalOverhead`,(`project`.`InternalOtherCost` - ifnull(`project`.`SpendingInternalOtherCost`,0)) AS `InternalOtherCost` from `project` ;

-- --------------------------------------------------------

--
-- Structure for view `salarycost`
--
DROP TABLE IF EXISTS `salarycost`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `salarycost`  AS  select `allocation`.`ProjectId` AS `ProjectId`,sum(((((timestampdiff(MONTH,(case when isnull(`project`.`SpendingDate`) then `allocation`.`StartDate` when (`allocation`.`StartDate` > `project`.`SpendingDate`) then `allocation`.`StartDate` else `project`.`SpendingDate` end),`allocation`.`EndDate`) * 0.01) * `allocation`.`Percentage`) * (1 + `person`.`SocialFactor`)) * `person`.`Salary`)) AS `Salary` from ((`allocation` join `project` on((`allocation`.`ProjectId` = `project`.`Id`))) join `person` on((`person`.`Id` = `allocation`.`PersonId`))) group by `allocation`.`ProjectId` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allocation`
--
ALTER TABLE `allocation`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_project` (`ProjectId`),
  ADD KEY `fk_person` (`PersonId`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allocation`
--
ALTER TABLE `allocation`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `allocation`
--
ALTER TABLE `allocation`
  ADD CONSTRAINT `fk_person` FOREIGN KEY (`PersonId`) REFERENCES `person` (`Id`),
  ADD CONSTRAINT `fk_project` FOREIGN KEY (`ProjectId`) REFERENCES `project` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
