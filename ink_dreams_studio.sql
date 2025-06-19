-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-06-2025 a las 22:08:09
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ink_dreams_studio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `artist_id` int(11) NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `duration_hours` decimal(3,1) DEFAULT 2.0,
  `status` enum('pending','confirmed','in_progress','completed','cancelled','no_show') DEFAULT 'pending',
  `tattoo_description` text NOT NULL,
  `tattoo_size` varchar(50) DEFAULT NULL,
  `tattoo_placement` varchar(100) DEFAULT NULL,
  `tattoo_style` varchar(50) DEFAULT NULL,
  `estimated_price` decimal(10,2) DEFAULT NULL,
  `final_price` decimal(10,2) DEFAULT NULL,
  `deposit_amount` decimal(10,2) DEFAULT 0.00,
  `deposit_paid` tinyint(1) DEFAULT 0,
  `payment_method` enum('cash','card','transfer','other') DEFAULT NULL,
  `session_number` int(11) DEFAULT 1,
  `total_sessions` int(11) DEFAULT 1,
  `consultation_notes` text DEFAULT NULL,
  `aftercare_given` tinyint(1) DEFAULT 0,
  `photos_taken` tinyint(1) DEFAULT 0,
  `client_satisfaction` tinyint(4) DEFAULT NULL CHECK (`client_satisfaction` between 1 and 5),
  `cancellation_reason` text DEFAULT NULL,
  `cancelled_by` enum('client','artist','studio') DEFAULT NULL,
  `reminder_sent` tinyint(1) DEFAULT 0,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `appointments`
--

INSERT INTO `appointments` (`id`, `client_id`, `artist_id`, `appointment_date`, `appointment_time`, `duration_hours`, `status`, `tattoo_description`, `tattoo_size`, `tattoo_placement`, `tattoo_style`, `estimated_price`, `final_price`, `deposit_amount`, `deposit_paid`, `payment_method`, `session_number`, `total_sessions`, `consultation_notes`, `aftercare_given`, `photos_taken`, `client_satisfaction`, `cancellation_reason`, `cancelled_by`, `reminder_sent`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 101, 1, '2025-06-20', '10:00:00', 2.0, 'completed', 'Retrato realista de su perro labrador', 'Mediano', 'Antebrazo', 'Realismo', 500.00, 500.00, 100.00, 1, 'card', 1, 1, 'Cliente pidió realismo en los ojos del perro', 1, 1, 5, NULL, NULL, 1, NULL, '2025-06-17 20:50:25', '2025-06-17 20:50:25'),
(2, 102, 2, '2025-06-21', '11:30:00', 1.0, 'completed', 'Pequeño diseño geométrico minimalista', 'Pequeño', 'Tobillo', 'geometrico', 300.00, 300.00, 50.00, 1, 'cash', 1, 1, 'Diseño enviado por Instagram', 1, 1, 4, NULL, NULL, 1, NULL, '2025-06-17 20:50:25', '2025-06-19 19:29:13'),
(3, 103, 3, '2025-06-22', '14:00:00', 1.5, 'completed', 'Águila al estilo tradicional americano', 'Grande', 'Espalda', 'Tradicional', 400.00, 400.00, 80.00, 1, 'transfer', 1, 1, 'Cliente pidió colores vivos y líneas gruesas', 1, 1, 5, NULL, NULL, 1, NULL, '2025-06-17 20:50:25', '2025-06-17 20:50:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `artists`
--

CREATE TABLE `artists` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `specialty` varchar(100) NOT NULL,
  `bio` text DEFAULT NULL,
  `experience_years` int(11) NOT NULL DEFAULT 0,
  `hourly_rate` decimal(10,2) NOT NULL DEFAULT 150.00,
  `instagram` varchar(100) DEFAULT NULL,
  `portfolio_url` varchar(255) DEFAULT NULL,
  `availability_schedule` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`availability_schedule`)),
  `is_active` tinyint(1) DEFAULT 1,
  `hire_date` date DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `artists`
--

INSERT INTO `artists` (`id`, `user_id`, `name`, `specialty`, `bio`, `experience_years`, `hourly_rate`, `instagram`, `portfolio_url`, `availability_schedule`, `is_active`, `hire_date`, `profile_image`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Alex Rivera', 'Realismo en Blanco y Negro', 'Especialista en tatuajes hiperrealistas en blanco y negro. Con 8 años de experiencia, ha desarrollado un estilo único que da vida a retratos e imágenes detalladas en la piel.', 8, 150.00, '@alex_tattoos', NULL, NULL, 1, NULL, NULL, '2025-06-17 19:20:06', '2025-06-17 19:20:06'),
(2, NULL, 'Sophia Chen', 'Tradicional Japonés', 'Con más de una década de experiencia, Sophia ha dominado el arte del tatuaje tradicional japonés. Sus líneas audaces y colores vibrantes crean piezas impresionantes.', 12, 160.00, '@sophia_ink', NULL, NULL, 1, NULL, NULL, '2025-06-17 19:20:06', '2025-06-17 19:20:06'),
(3, NULL, 'Marcus Johnson', 'Neo Tradicional', 'Marcus aporta una perspectiva fresca a las imágenes tradicionales del tatuaje con su estilo neo-tradicional. Su trabajo presenta líneas audaces y colores vibrantes.', 5, 140.00, '@marcus_tattoo', NULL, NULL, 1, NULL, NULL, '2025-06-17 19:20:06', '2025-06-17 19:20:06'),
(4, NULL, 'Elena Rodriguez', 'Acuarela', 'Los tatuajes de acuarela de Elena son conocidos por su calidad onírica y pictórica. Mezcla expertamente los colores para crear piezas etéreas.', 7, 155.00, '@elena_watercolor', NULL, NULL, 1, NULL, NULL, '2025-06-17 19:20:06', '2025-06-17 19:20:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `emergency_contact_name` varchar(100) DEFAULT NULL,
  `emergency_contact_phone` varchar(20) DEFAULT NULL,
  `medical_conditions` text DEFAULT NULL,
  `allergies` text DEFAULT NULL,
  `previous_tattoos` tinyint(1) DEFAULT 0,
  `referral_source` varchar(100) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `total_spent` decimal(10,2) DEFAULT 0.00,
  `total_appointments` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `clients`
--

INSERT INTO `clients` (`id`, `first_name`, `last_name`, `email`, `phone`, `date_of_birth`, `emergency_contact_name`, `emergency_contact_phone`, `medical_conditions`, `allergies`, `previous_tattoos`, `referral_source`, `notes`, `total_spent`, `total_appointments`, `is_active`, `created_at`, `updated_at`) VALUES
(101, 'Carlos', 'Ramírez', 'carlos.ramirez@example.com', '3001112233', '1990-05-15', 'Ana Ramírez', '3001122334', NULL, 'Latex', 1, 'Instagram', NULL, 500.00, 2, 1, '2025-06-17 20:45:41', '2025-06-17 20:45:41'),
(102, 'Luisa', 'González', 'luisa.gonzalez@example.com', '3002223344', '1995-08-20', NULL, NULL, NULL, NULL, 0, 'Recomendación', NULL, 300.00, 1, 1, '2025-06-17 20:45:41', '2025-06-17 20:45:41'),
(103, 'Andrés', 'Torres', 'andres.torres@example.com', '3003334455', '1988-02-10', 'María Torres', '3009988776', NULL, NULL, 1, NULL, NULL, 400.00, 1, 1, '2025-06-17 20:45:41', '2025-06-17 20:45:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `artist_id` int(11) NOT NULL,
  `appointment_id` int(11) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `tattoo_style` varchar(50) DEFAULT NULL,
  `tattoo_size` varchar(50) DEFAULT NULL,
  `tattoo_placement` varchar(100) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `is_public` tinyint(1) DEFAULT 1,
  `client_consent` tinyint(1) DEFAULT 0,
  `likes_count` int(11) DEFAULT 0,
  `views_count` int(11) DEFAULT 0,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `gallery`
--

INSERT INTO `gallery` (`id`, `artist_id`, `appointment_id`, `title`, `description`, `image_url`, `thumbnail_url`, `tattoo_style`, `tattoo_size`, `tattoo_placement`, `is_featured`, `is_public`, `client_consent`, `likes_count`, `views_count`, `tags`, `created_at`, `updated_at`) VALUES
(66, 1, 1, 'Retrato Realista de Mascota', 'Un emotivo retrato en blanco y negro de la querida mascota del cliente. Cada detalle del pelaje y la expresión fueron capturados con precisión fotográfica.', './img/tatu1.jpg', './img/tatu1.jpg', 'Realismo', 'Mediano', 'Antebrazo', 1, 1, 1, 0, 0, '[\"realismo\", \"mascota\", \"retrato\", \"blanco y negro\", \"perro\"]', '2025-06-17 20:57:31', '2025-06-19 19:27:38'),
(67, 2, 2, 'Pequeño diseño geométrico minimalista', 'Diseño enviado por Instagram', './img/tatu2.webp', './img/tatu2.webp', 'geometrico', 'Pequeño', 'Tobillo', 1, 1, 1, 0, 0, '[\"geométrico\", \"minimalista\", \"tobillo\"]', '2025-06-17 20:57:31', '2025-06-19 19:36:20'),
(68, 3, 3, 'Águila al estilo tradicional americano', 'Cliente pidió colores vivos y líneas gruesas', './img/tatu3.jpg', './img/tatu3.jpg', 'Acuarela', 'Grande', 'Espalda', 1, 1, 1, 0, 0, '[\"tradicional\", \"águila\", \"americano\", \"espalda\", \"colores vivos\"]', '2025-06-17 20:57:31', '2025-06-19 19:36:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `category` enum('ink','needles','equipment','aftercare','supplies','other') NOT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `size` varchar(30) DEFAULT NULL,
  `current_stock` int(11) NOT NULL DEFAULT 0,
  `minimum_stock` int(11) DEFAULT 5,
  `unit_cost` decimal(8,2) DEFAULT NULL,
  `supplier` varchar(100) DEFAULT NULL,
  `supplier_contact` varchar(100) DEFAULT NULL,
  `last_restocked` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `inventory`
--

INSERT INTO `inventory` (`id`, `item_name`, `category`, `brand`, `color`, `size`, `current_stock`, `minimum_stock`, `unit_cost`, `supplier`, `supplier_contact`, `last_restocked`, `expiry_date`, `location`, `notes`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Tinta Negra', 'ink', 'Eternal Ink', NULL, NULL, 10, 3, 25.00, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2025-06-17 19:20:06', '2025-06-17 19:20:06'),
(2, 'Agujas Round Liner 3RL', 'needles', 'Cheyenne', NULL, NULL, 50, 10, 2.50, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2025-06-17 19:20:06', '2025-06-17 19:20:06'),
(3, 'Agujas Round Shader 5RS', 'needles', 'Cheyenne', NULL, NULL, 40, 10, 2.50, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2025-06-17 19:20:06', '2025-06-17 19:20:06'),
(4, 'Crema Aftercare', 'aftercare', 'Hustle Butter', NULL, NULL, 15, 5, 12.00, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2025-06-17 19:20:06', '2025-06-17 19:20:06'),
(5, 'Guantes Nitrilo', 'supplies', 'Generic', NULL, NULL, 200, 50, 0.15, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2025-06-17 19:20:06', '2025-06-17 19:20:06'),
(6, 'Film Protector', 'supplies', 'Saniderm', NULL, NULL, 25, 5, 8.00, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2025-06-17 19:20:06', '2025-06-17 19:20:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventory_usage`
--

CREATE TABLE `inventory_usage` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `inventory_id` int(11) NOT NULL,
  `quantity_used` int(11) NOT NULL,
  `cost_per_unit` decimal(8,2) DEFAULT NULL,
  `total_cost` decimal(10,2) DEFAULT NULL,
  `used_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `non_working_days`
--

CREATE TABLE `non_working_days` (
  `id` int(11) NOT NULL,
  `artist_id` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `type` enum('vacation','sick','holiday','personal','studio_closed') NOT NULL,
  `is_recurring` tinyint(1) DEFAULT 0,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_type` enum('deposit','partial','full','refund') NOT NULL,
  `payment_method` enum('cash','card','transfer','paypal','other') NOT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','completed','failed','refunded') DEFAULT 'completed',
  `notes` text DEFAULT NULL,
  `processed_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `studio_settings`
--

CREATE TABLE `studio_settings` (
  `id` int(11) NOT NULL,
  `setting_key` varchar(50) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `setting_type` enum('string','number','boolean','json') DEFAULT 'string',
  `description` text DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `studio_settings`
--

INSERT INTO `studio_settings` (`id`, `setting_key`, `setting_value`, `setting_type`, `description`, `updated_by`, `updated_at`) VALUES
(1, 'studio_name', 'Ink Dreams', 'string', 'Nombre del estudio', NULL, '2025-06-17 19:20:06'),
(2, 'studio_address', 'Calle del Arte 123, Ciudad', 'string', 'Dirección del estudio', NULL, '2025-06-17 19:20:06'),
(3, 'studio_phone', '(555) 123-4567', 'string', 'Teléfono principal', NULL, '2025-06-17 19:20:06'),
(4, 'studio_email', 'info@inkdreams.com', 'string', 'Email de contacto', NULL, '2025-06-17 19:20:06'),
(5, 'default_deposit', '50.00', 'number', 'Depósito por defecto', NULL, '2025-06-17 19:20:06'),
(6, 'appointment_duration', '2.0', 'number', 'Duración por defecto de citas (horas)', NULL, '2025-06-17 19:20:06'),
(7, 'booking_advance_days', '30', 'number', 'Días de anticipación para reservas', NULL, '2025-06-17 19:20:06'),
(8, 'cancellation_hours', '24', 'number', 'Horas mínimas para cancelación', NULL, '2025-06-17 19:20:06'),
(9, 'reminder_hours', '24', 'number', 'Horas antes para enviar recordatorio', NULL, '2025-06-17 19:20:06'),
(10, 'max_daily_appointments', '8', 'number', 'Máximo de citas por día por artista', NULL, '2025-06-17 19:20:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `role` enum('admin','manager','receptionist','artist') NOT NULL DEFAULT 'receptionist',
  `phone` varchar(20) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `first_name`, `last_name`, `role`, `phone`, `is_active`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@inkdreams.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'Sistema', 'admin', NULL, 1, NULL, '2025-06-17 19:20:06', '2025-06-17 19:20:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `waiting_list`
--

CREATE TABLE `waiting_list` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `preferred_artist_id` int(11) DEFAULT NULL,
  `urgency` enum('asap','week','month','flexible') DEFAULT 'flexible',
  `tattoo_description` text NOT NULL,
  `preferred_dates` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`preferred_dates`)),
  `budget_range` varchar(50) DEFAULT NULL,
  `contacted` tinyint(1) DEFAULT 0,
  `contact_attempts` int(11) DEFAULT 0,
  `last_contact_date` timestamp NULL DEFAULT NULL,
  `converted_to_appointment` tinyint(1) DEFAULT 0,
  `appointment_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `work_schedules`
--

CREATE TABLE `work_schedules` (
  `id` int(11) NOT NULL,
  `artist_id` int(11) NOT NULL,
  `day_of_week` tinyint(4) NOT NULL CHECK (`day_of_week` between 0 and 6),
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `break_start` time DEFAULT NULL,
  `break_end` time DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `effective_from` date NOT NULL,
  `effective_until` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `work_schedules`
--

INSERT INTO `work_schedules` (`id`, `artist_id`, `day_of_week`, `start_time`, `end_time`, `break_start`, `break_end`, `is_available`, `effective_from`, `effective_until`, `created_at`) VALUES
(1, 1, 1, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(2, 2, 1, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(3, 3, 1, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(4, 4, 1, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(6, 1, 2, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(7, 2, 2, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(8, 3, 2, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(9, 4, 2, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(11, 1, 3, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(12, 2, 3, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(13, 3, 3, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(14, 4, 3, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(16, 1, 4, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(17, 2, 4, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(18, 3, 4, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(19, 4, 4, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(21, 1, 5, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(22, 2, 5, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(23, 3, 5, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(24, 4, 5, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(26, 1, 6, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(27, 2, 6, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(28, 3, 6, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06'),
(29, 4, 6, '11:00:00', '20:00:00', NULL, NULL, 1, '2025-06-17', NULL, '2025-06-17 19:20:06');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_appointment_date` (`appointment_date`),
  ADD KEY `idx_artist_date` (`artist_id`,`appointment_date`),
  ADD KEY `idx_client_appointments` (`client_id`);

--
-- Indices de la tabla `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`appointment_id`),
  ADD KEY `idx_artist_gallery` (`artist_id`),
  ADD KEY `idx_style` (`tattoo_style`),
  ADD KEY `idx_featured` (`is_featured`,`is_public`);

--
-- Indices de la tabla `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_low_stock` (`current_stock`,`minimum_stock`);

--
-- Indices de la tabla `inventory_usage`
--
ALTER TABLE `inventory_usage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_appointment_usage` (`appointment_id`),
  ADD KEY `idx_inventory_usage` (`inventory_id`);

--
-- Indices de la tabla `non_working_days`
--
ALTER TABLE `non_working_days`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `idx_date` (`date`),
  ADD KEY `idx_artist_date` (`artist_id`,`date`);

--
-- Indices de la tabla `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `processed_by` (`processed_by`),
  ADD KEY `idx_appointment_payments` (`appointment_id`),
  ADD KEY `idx_client_payments` (`client_id`),
  ADD KEY `idx_payment_date` (`payment_date`);

--
-- Indices de la tabla `studio_settings`
--
ALTER TABLE `studio_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `waiting_list`
--
ALTER TABLE `waiting_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `appointment_id` (`appointment_id`),
  ADD KEY `idx_urgency` (`urgency`),
  ADD KEY `idx_artist_waiting` (`preferred_artist_id`);

--
-- Indices de la tabla `work_schedules`
--
ALTER TABLE `work_schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_artist_schedule` (`artist_id`,`day_of_week`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `artists`
--
ALTER TABLE `artists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT de la tabla `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `inventory_usage`
--
ALTER TABLE `inventory_usage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `non_working_days`
--
ALTER TABLE `non_working_days`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `studio_settings`
--
ALTER TABLE `studio_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `waiting_list`
--
ALTER TABLE `waiting_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `work_schedules`
--
ALTER TABLE `work_schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `artists`
--
ALTER TABLE `artists`
  ADD CONSTRAINT `artists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `gallery_ibfk_2` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `inventory_usage`
--
ALTER TABLE `inventory_usage`
  ADD CONSTRAINT `inventory_usage_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inventory_usage_ibfk_2` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `non_working_days`
--
ALTER TABLE `non_working_days`
  ADD CONSTRAINT `non_working_days_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `non_working_days_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payments_ibfk_3` FOREIGN KEY (`processed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `studio_settings`
--
ALTER TABLE `studio_settings`
  ADD CONSTRAINT `studio_settings_ibfk_1` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `waiting_list`
--
ALTER TABLE `waiting_list`
  ADD CONSTRAINT `waiting_list_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `waiting_list_ibfk_2` FOREIGN KEY (`preferred_artist_id`) REFERENCES `artists` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `waiting_list_ibfk_3` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `work_schedules`
--
ALTER TABLE `work_schedules`
  ADD CONSTRAINT `work_schedules_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
