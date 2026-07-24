-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2026 at 02:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `legal-case-management-2nd`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `matter_id` int(11) DEFAULT NULL,
  `actor_user_id` int(11) DEFAULT NULL,
  `entity_type` varchar(191) NOT NULL,
  `entity_id` int(11) NOT NULL,
  `action` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `matter_id`, `actor_user_id`, `entity_type`, `entity_id`, `action`, `description`, `created_at`) VALUES
(1, NULL, 6, 'Agency', 1, 'CREATE', '{\"message\":\"Created agency legal group\",\"severity\":\"medium\"}', '2026-07-23 11:35:48.799'),
(2, NULL, 6, 'Office', 1, 'CREATE', '{\"message\":\"Created office indore branch \",\"severity\":\"medium\"}', '2026-07-23 11:36:49.930'),
(3, NULL, 6, 'User', 9, 'CREATE', '{\"message\":\"Created user vj (admin)\",\"severity\":\"medium\"}', '2026-07-23 11:38:15.607'),
(4, NULL, 6, 'User', 7, 'DEACTIVATE', '{\"message\":\"Deactivated user account deep \",\"severity\":\"high\"}', '2026-07-23 11:38:25.519'),
(5, NULL, 6, 'User', 7, 'DEACTIVATE', '{\"message\":\"Deactivated user account deep \",\"severity\":\"high\"}', '2026-07-23 11:38:40.408'),
(6, NULL, 6, 'User', 7, 'DEACTIVATE', '{\"message\":\"Deactivated user account deep \",\"severity\":\"high\"}', '2026-07-23 11:38:46.783'),
(7, NULL, 6, 'User', 9, 'DEACTIVATE', '{\"message\":\"Deactivated user account vj\",\"severity\":\"high\"}', '2026-07-23 11:39:05.442'),
(8, NULL, 6, 'User', 9, 'UPDATE', '{\"message\":\"Updated user profile vj\",\"severity\":\"medium\"}', '2026-07-23 11:39:19.425'),
(9, NULL, 6, 'User', 10, 'CREATE', '{\"message\":\"Created user pj (partner)\",\"severity\":\"medium\"}', '2026-07-23 11:40:25.939'),
(10, NULL, 6, 'User', 11, 'CREATE', '{\"message\":\"Created user l (lawyer)\",\"severity\":\"medium\"}', '2026-07-23 11:41:13.777'),
(11, NULL, 6, 'User', 12, 'CREATE', '{\"message\":\"Created user para (paralegal)\",\"severity\":\"medium\"}', '2026-07-23 11:41:57.279'),
(12, NULL, 6, 'User', 13, 'CREATE', '{\"message\":\"Created user cl (client)\",\"severity\":\"medium\"}', '2026-07-23 11:42:34.342'),
(13, NULL, 6, 'User', 9, 'UPDATE', '{\"message\":\"Updated user profile vj\",\"severity\":\"medium\"}', '2026-07-23 11:43:24.508'),
(20, NULL, 6, 'Agency', 2, 'DEACTIVATE', '{\"message\":\"Soft-deleted agency Apex Legal Group\",\"severity\":\"high\"}', '2026-07-24 06:20:11.834'),
(21, NULL, 6, 'Agency', 3, 'DEACTIVATE', '{\"message\":\"Soft-deleted agency Lexington Partners\",\"severity\":\"high\"}', '2026-07-24 06:20:15.764'),
(22, NULL, 6, 'Agency', 101, 'DEACTIVATE', '{\"message\":\"Soft-deleted agency Apex Legal Group\",\"severity\":\"high\"}', '2026-07-24 06:20:20.193'),
(23, NULL, 6, 'Agency', 102, 'DEACTIVATE', '{\"message\":\"Soft-deleted agency Vanguard Law Partners\",\"severity\":\"high\"}', '2026-07-24 06:20:24.094'),
(24, NULL, 6, 'Agency', 103, 'DEACTIVATE', '{\"message\":\"Soft-deleted agency Beacon Civil Rights\",\"severity\":\"high\"}', '2026-07-24 06:20:29.024'),
(25, NULL, 6, 'Agency', 104, 'CREATE', '{\"message\":\"Created agency kiaan\",\"severity\":\"medium\"}', '2026-07-24 06:21:16.038'),
(26, NULL, 6, 'User', 24, 'CREATE', '{\"message\":\"Created user kiaan admin (admin) for agency ID 104\",\"severity\":\"medium\"}', '2026-07-24 06:21:59.507'),
(27, NULL, 6, 'Agency', 1, 'UPDATE', '{\"message\":\"Updated agency legal group authority\",\"old_values\":{\"name\":\"legal group\",\"plan\":\"Professional\",\"status\":\"active\"},\"new_values\":{\"name\":\"legal group authority\",\"plan\":\"Professional\",\"status\":\"active\"},\"severity\":\"medium\"}', '2026-07-24 09:56:51.527'),
(28, NULL, 6, 'Agency', 1, 'UPDATE', '{\"message\":\"Updated agency legal group Agency\",\"old_values\":{\"name\":\"legal group authority\",\"plan\":\"Professional\",\"status\":\"active\"},\"new_values\":{\"name\":\"legal group Agency\",\"plan\":\"Professional\",\"status\":\"active\"},\"severity\":\"medium\"}', '2026-07-24 09:58:19.564'),
(29, NULL, 6, 'Office', 103, 'DEACTIVATE', '{\"message\":\"Soft-deleted office Uppsala Branch\",\"severity\":\"medium\"}', '2026-07-24 09:58:34.714'),
(30, NULL, 6, 'Office', 102, 'DEACTIVATE', '{\"message\":\"Soft-deleted office Malmö Office\",\"severity\":\"medium\"}', '2026-07-24 09:58:42.331'),
(31, NULL, 6, 'Office', 101, 'DEACTIVATE', '{\"message\":\"Soft-deleted office Gothenburg Branch\",\"severity\":\"medium\"}', '2026-07-24 09:58:45.932'),
(32, NULL, 9, 'invoice', 1, 'paid', 'Invoice INV-1784869441606 marked paid via manual workflow', '2026-07-24 10:01:58.120');

-- --------------------------------------------------------

--
-- Table structure for table `agencies`
--

CREATE TABLE `agencies` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `owner` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `plan` varchar(191) NOT NULL DEFAULT 'Professional',
  `status` varchar(191) NOT NULL DEFAULT 'active',
  `subscription_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `billing_cycle` varchar(191) NOT NULL DEFAULT 'monthly',
  `next_billing` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `agencies`
--

INSERT INTO `agencies` (`id`, `name`, `owner`, `email`, `phone`, `plan`, `status`, `subscription_amount`, `billing_cycle`, `next_billing`, `is_deleted`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'legal group Agency', 'Pilbågen Admin', 'lal@pilbagen.se', '1236854665', 'Professional', 'active', 0.00, 'monthly', '2026-07-23 11:35:48.776', 0, NULL, '2026-07-23 11:35:48.777', '2026-07-24 09:58:19.548'),
(2, 'Apex Legal Group', 'Robert Vance', 'vance@apexlegal.com', NULL, 'Professional', 'inactive', 0.00, 'monthly', '2026-07-23 11:58:02.376', 1, '2026-07-24 06:20:11.816', '2026-07-23 11:58:02.376', '2026-07-24 06:20:11.818'),
(3, 'Lexington Partners', 'Eleanor Vance', 'contact@lexingtonlaw.com', NULL, 'Professional', 'inactive', 0.00, 'monthly', '2026-07-23 11:58:02.396', 1, '2026-07-24 06:20:15.756', '2026-07-23 11:58:02.396', '2026-07-24 06:20:15.757'),
(101, 'Apex Legal Group', 'Alexander Mercer', 'alex@apexlegal.se', NULL, 'Professional', 'inactive', 850.00, 'monthly', '2026-07-24 05:30:48.205', 1, '2026-07-24 06:20:20.186', '2026-07-24 05:30:48.205', '2026-07-24 06:20:20.187'),
(102, 'Vanguard Law Partners', 'Sophia Lin', 'sophia@vanguardlaw.se', NULL, 'Enterprise', 'inactive', 1500.00, 'monthly', '2026-07-24 05:30:48.214', 1, '2026-07-24 06:20:24.086', '2026-07-24 05:30:48.214', '2026-07-24 06:20:24.088'),
(103, 'Beacon Civil Rights', 'Marcus Vance', 'marcus@beaconcivil.se', NULL, 'Basic', 'inactive', 450.00, 'monthly', '2026-07-24 05:30:48.218', 1, '2026-07-24 06:20:29.015', '2026-07-24 05:30:48.218', '2026-07-24 06:20:29.017'),
(104, 'kiaan', 'robert', 'k@gmail.com', '1234565432', 'Professional', 'active', 0.00, 'monthly', '2026-07-24 06:21:16.027', 0, NULL, '2026-07-24 06:21:16.030', '2026-07-24 06:21:16.030');

-- --------------------------------------------------------

--
-- Table structure for table `calendar_categories`
--

CREATE TABLE `calendar_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `color` varchar(191) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `calendar_categories`
--

INSERT INTO `calendar_categories` (`id`, `name`, `color`, `created_at`, `updated_at`, `is_active`, `sort_order`) VALUES
(1, 'Hearing', '#ef4444', '2026-07-24 05:15:42.420', '2026-07-24 05:15:42.420', 1, 1),
(2, 'Meeting', '#10b981', '2026-07-24 05:15:42.420', '2026-07-24 05:15:42.420', 1, 2),
(3, 'Deadline', '#f59e0b', '2026-07-24 05:15:42.420', '2026-07-24 05:15:42.420', 1, 3),
(4, 'Consultation', '#38bdf8', '2026-07-24 05:15:42.420', '2026-07-24 05:15:42.420', 1, 4),
(5, 'Case Review', '#8b5cf6', '2026-07-24 05:15:42.420', '2026-07-24 05:15:42.420', 1, 5),
(6, 'Personal', '#ec4899', '2026-07-24 05:15:42.420', '2026-07-24 05:15:42.420', 1, 6);

-- --------------------------------------------------------

--
-- Table structure for table `calendar_events`
--

CREATE TABLE `calendar_events` (
  `id` int(11) NOT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_date` datetime(3) NOT NULL,
  `matter_id` int(11) DEFAULT NULL,
  `type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `court_related` tinyint(1) NOT NULL DEFAULT 0,
  `end_date` datetime(3) DEFAULT NULL,
  `event_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'scheduled',
  `reminder_date` datetime(3) DEFAULT NULL,
  `reminder_sent` tinyint(1) NOT NULL DEFAULT 0,
  `titan_event_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `appearance_type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `court_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `court_room` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_court_event` tinyint(1) NOT NULL DEFAULT 0,
  `judge_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reminder_sent_1d` tinyint(1) NOT NULL DEFAULT 0,
  `reminder_sent_3d` tinyint(1) NOT NULL DEFAULT 0,
  `reminder_sent_7d` tinyint(1) NOT NULL DEFAULT 0,
  `reminder_sent_same_day` tinyint(1) NOT NULL DEFAULT 0,
  `create_task` tinyint(1) NOT NULL DEFAULT 0,
  `activity_id` int(11) DEFAULT NULL,
  `attachments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`attachments`)),
  `busy_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categories` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`categories`)),
  `is_all_day` tinyint(1) NOT NULL DEFAULT 0,
  `location` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `outlook_event_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `outlook_series_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recurrence_rule` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timezone` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `importance` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'normal',
  `is_online_meeting` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `calendar_events`
--

INSERT INTO `calendar_events` (`id`, `title`, `event_date`, `matter_id`, `type`, `description`, `created_by`, `created_at`, `court_related`, `end_date`, `event_status`, `reminder_date`, `reminder_sent`, `titan_event_id`, `appearance_type`, `court_name`, `court_room`, `is_court_event`, `judge_name`, `reminder_sent_1d`, `reminder_sent_3d`, `reminder_sent_7d`, `reminder_sent_same_day`, `create_task`, `activity_id`, `attachments`, `busy_status`, `categories`, `is_all_day`, `location`, `outlook_event_id`, `outlook_series_id`, `recurrence_rule`, `timezone`, `importance`, `is_online_meeting`) VALUES
(2, 'party ', '2026-07-23 18:30:00.000', NULL, 'meeting', NULL, 9, '2026-07-24 05:18:33.377', 0, '2026-07-23 19:00:00.000', 'scheduled', NULL, 0, NULL, NULL, NULL, NULL, 0, NULL, 0, 0, 0, 0, 0, NULL, '[]', 'busy', '[]', 0, NULL, NULL, NULL, NULL, 'UTC', 'normal', 0);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `full_name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `address_line_1` varchar(191) DEFAULT NULL,
  `address_line_2` varchar(191) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `state` varchar(191) DEFAULT NULL,
  `postal_code` varchar(191) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `is_portal_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `business_address` varchar(191) DEFAULT NULL,
  `contact_first_name` varchar(191) DEFAULT NULL,
  `contact_last_name` varchar(191) DEFAULT NULL,
  `organization_name` varchar(191) DEFAULT NULL,
  `party_role` varchar(191) NOT NULL DEFAULT 'Client',
  `party_type` varchar(191) NOT NULL DEFAULT 'Individual',
  `home_address` varchar(191) DEFAULT NULL,
  `opposing_counsel_name` varchar(191) DEFAULT NULL,
  `opposing_law_firm` varchar(191) DEFAULT NULL,
  `opposing_party_name` varchar(191) DEFAULT NULL,
  `fortnox_customer_number` varchar(191) DEFAULT NULL,
  `agency_id` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `user_id`, `full_name`, `email`, `phone`, `address_line_1`, `address_line_2`, `city`, `state`, `postal_code`, `notes`, `is_portal_enabled`, `created_at`, `updated_at`, `business_address`, `contact_first_name`, `contact_last_name`, `organization_name`, `party_role`, `party_type`, `home_address`, `opposing_counsel_name`, `opposing_law_firm`, `opposing_party_name`, `fortnox_customer_number`, `agency_id`) VALUES
(3, 19, 'lawyerClient 1', 'lawyer@gmail.com', '789456123', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2026-07-23 12:21:16.963', '2026-07-23 12:21:16.963', NULL, NULL, NULL, NULL, 'Client', 'Individual', 'tikri', NULL, NULL, 'wer', NULL, 1),
(4, 3, 'Sarah Client', 'client@pilbagen.se', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2026-07-24 05:30:48.509', '2026-07-24 05:30:48.509', NULL, NULL, NULL, NULL, 'Client', 'Individual', NULL, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `communications`
--

CREATE TABLE `communications` (
  `id` int(11) NOT NULL,
  `matter_id` int(11) DEFAULT NULL,
  `sender_user_id` int(11) NOT NULL,
  `sender_role` enum('admin','lawyer','client') NOT NULL,
  `message_body` text NOT NULL,
  `visibility` enum('internal','client_shared','client_visible') NOT NULL DEFAULT 'internal',
  `communication_type` enum('portal_message','note','email_log','call_log','meeting_log','titan_email') NOT NULL DEFAULT 'portal_message',
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `read_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `subject` varchar(191) DEFAULT NULL,
  `bcc` text DEFAULT NULL,
  `cc` text DEFAULT NULL,
  `to` text DEFAULT NULL,
  `activity_id` int(11) DEFAULT NULL,
  `request_read_receipt` tinyint(1) NOT NULL DEFAULT 0,
  `track_opens` tinyint(1) NOT NULL DEFAULT 0,
  `opened` tinyint(1) NOT NULL DEFAULT 0,
  `opened_time` datetime(3) DEFAULT NULL,
  `open_count` int(11) NOT NULL DEFAULT 0,
  `email_account_id` int(11) DEFAULT NULL,
  `external_message_id` varchar(191) DEFAULT NULL,
  `external_thread_id` varchar(191) DEFAULT NULL,
  `folder` varchar(191) DEFAULT NULL,
  `in_reply_to` varchar(191) DEFAULT NULL,
  `is_archived` tinyint(1) NOT NULL DEFAULT 0,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `is_draft` tinyint(1) NOT NULL DEFAULT 0,
  `is_flagged` tinyint(1) NOT NULL DEFAULT 0,
  `is_spam` tinyint(1) NOT NULL DEFAULT 0,
  `is_starred` tinyint(1) NOT NULL DEFAULT 0,
  `references` text DEFAULT NULL,
  `sync_status` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company_profile`
--

CREATE TABLE `company_profile` (
  `id` int(11) NOT NULL,
  `company_name` varchar(191) DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `website` varchar(191) DEFAULT NULL,
  `logo_url` varchar(191) DEFAULT NULL,
  `letterhead_url` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `fortnox_access_token` varchar(191) DEFAULT NULL,
  `fortnox_api_key` varchar(191) DEFAULT NULL,
  `fortnox_client_secret` varchar(191) DEFAULT NULL,
  `fortnox_cost_center` varchar(191) DEFAULT NULL,
  `fortnox_enabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `conflict_checks`
--

CREATE TABLE `conflict_checks` (
  `id` int(11) NOT NULL,
  `prospective_client_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `opposing_party_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `result` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `matches` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`matches`)),
  `created_by_user_id` int(11) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `court_form_field_mappings`
--

CREATE TABLE `court_form_field_mappings` (
  `id` int(11) NOT NULL,
  `template_id` int(11) NOT NULL,
  `field_name` varchar(191) NOT NULL,
  `page_number` int(11) NOT NULL,
  `x_position` double NOT NULL,
  `y_position` double NOT NULL,
  `font_size` double NOT NULL DEFAULT 10,
  `system_field_path` varchar(191) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `court_form_mappings`
--

CREATE TABLE `court_form_mappings` (
  `id` int(11) NOT NULL,
  `template_id` int(11) NOT NULL,
  `pdf_field_name` varchar(191) NOT NULL,
  `system_field_path` varchar(191) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `court_form_templates`
--

CREATE TABLE `court_form_templates` (
  `id` int(11) NOT NULL,
  `form_number` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `practice_area` varchar(191) DEFAULT NULL,
  `pdf_path` varchar(191) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `custom_field_definitions`
--

CREATE TABLE `custom_field_definitions` (
  `id` int(11) NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options`)),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `custom_field_definitions`
--

INSERT INTO `custom_field_definitions` (`id`, `name`, `type`, `options`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Settlement Goal', 'currency', NULL, 1, '2026-07-24 05:30:48.567', '2026-07-24 05:30:48.567'),
(2, 'Statute of Limitations', 'date', NULL, 1, '2026-07-24 05:30:48.571', '2026-07-24 05:30:48.571'),
(3, 'Court Jurisdiction', 'text', NULL, 1, '2026-07-24 05:30:48.573', '2026-07-24 05:30:48.573');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `matter_id` int(11) NOT NULL,
  `uploaded_by_user_id` int(11) NOT NULL,
  `file_name` varchar(191) NOT NULL,
  `original_name` varchar(191) NOT NULL,
  `mime_type` varchar(191) NOT NULL,
  `file_path` varchar(191) NOT NULL,
  `file_size` int(11) NOT NULL,
  `visibility` enum('internal','client_shared','client_visible') NOT NULL DEFAULT 'internal',
  `category` varchar(191) DEFAULT NULL,
  `is_signature_required` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `folder_id` int(11) DEFAULT NULL,
  `folder_path` varchar(191) DEFAULT NULL,
  `extracted_text` text DEFAULT NULL,
  `agency_id` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `document_categories`
--

CREATE TABLE `document_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `drafts`
--

CREATE TABLE `drafts` (
  `id` int(11) NOT NULL,
  `matter_id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `category` varchar(191) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `status` enum('draft','ready','sent_for_signature','signed') NOT NULL DEFAULT 'draft',
  `created_by_user_id` int(11) NOT NULL,
  `last_updated_by_user_id` int(11) DEFAULT NULL,
  `sent_for_signature_at` datetime(3) DEFAULT NULL,
  `signed_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `signed_document_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `email_accounts`
--

CREATE TABLE `email_accounts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `provider` varchar(191) NOT NULL,
  `email_address` varchar(191) NOT NULL,
  `smtp_host` varchar(191) DEFAULT NULL,
  `smtp_port` int(11) DEFAULT NULL,
  `imap_host` varchar(191) DEFAULT NULL,
  `imap_port` int(11) DEFAULT NULL,
  `username` varchar(191) DEFAULT NULL,
  `password` varchar(191) DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `sync_status` varchar(191) DEFAULT NULL,
  `last_sync_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_attendees`
--

CREATE TABLE `event_attendees` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `is_optional` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `folders`
--

CREATE TABLE `folders` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `matter_id` int(11) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `folders`
--

INSERT INTO `folders` (`id`, `name`, `matter_id`, `created_at`) VALUES
(1, 'folder2', NULL, '2026-07-24 05:14:43.590'),
(2, 'chini', NULL, '2026-07-24 07:47:08.723');

-- --------------------------------------------------------

--
-- Table structure for table `generated_forms`
--

CREATE TABLE `generated_forms` (
  `id` int(11) NOT NULL,
  `template_id` int(11) NOT NULL,
  `matter_id` int(11) NOT NULL,
  `form_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`form_data`)),
  `pdf_file_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `created_by` int(11) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `generic_activities`
--

CREATE TABLE `generic_activities` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(191) DEFAULT 'Open',
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `matter_id` int(11) NOT NULL,
  `invoice_number` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `due_date` datetime(3) DEFAULT NULL,
  `status` enum('draft','unpaid','due','paid','overdue','void') NOT NULL DEFAULT 'draft',
  `issued_at` datetime(3) DEFAULT NULL,
  `paid_at` datetime(3) DEFAULT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `email_error` varchar(191) DEFAULT NULL,
  `email_status` varchar(191) DEFAULT NULL,
  `payment_link` varchar(191) DEFAULT NULL,
  `pdf_document_id` int(11) DEFAULT NULL,
  `sent_at` datetime(3) DEFAULT NULL,
  `fortnox_error` varchar(191) DEFAULT NULL,
  `fortnox_id` varchar(191) DEFAULT NULL,
  `fortnox_status` varchar(191) DEFAULT NULL,
  `fortnox_synced_at` datetime(3) DEFAULT NULL,
  `agency_id` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_items`
--

CREATE TABLE `invoice_items` (
  `id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `description` varchar(191) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lawyers`
--

CREATE TABLE `lawyers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `display_name` varchar(191) NOT NULL,
  `practice_focus` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lawyers`
--

INSERT INTO `lawyers` (`id`, `user_id`, `display_name`, `practice_focus`, `phone`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 14, 'Apex Lawyer 1', NULL, NULL, 1, '2026-07-23 11:58:02.511', '2026-07-23 11:58:02.511'),
(2, 15, 'Apex Paralegal 1', NULL, NULL, 1, '2026-07-23 11:58:02.613', '2026-07-23 11:58:02.613'),
(3, 16, 'Lexington Partner 1', NULL, NULL, 1, '2026-07-23 11:58:02.710', '2026-07-23 11:58:02.710'),
(7, 22, 'vj_partner r', NULL, NULL, 1, '2026-07-24 05:53:19.576', '2026-07-24 11:38:03.712'),
(8, 23, 'paralegal l', NULL, NULL, 1, '2026-07-24 05:54:39.438', '2026-07-24 11:38:47.746'),
(9, 19, 'lawyerClient 1', NULL, NULL, 1, '2026-07-24 11:40:33.485', '2026-07-24 11:40:42.149');

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(11) NOT NULL,
  `full_name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `matter_type` varchar(191) DEFAULT NULL,
  `practice_area` varchar(191) DEFAULT NULL,
  `source` varchar(191) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` enum('new','screening','referred','consultation_set','retained','declined','archived') NOT NULL DEFAULT 'new',
  `notes` text DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  `converted_client_id` int(11) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `agency_id` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `full_name`, `email`, `phone`, `matter_type`, `practice_area`, `source`, `message`, `status`, `notes`, `created_by_user_id`, `converted_client_id`, `created_at`, `updated_at`, `agency_id`) VALUES
(1, 'Sample Lead', 'lead@example.com', '123-456-7890', 'Divorce', 'Family Law', 'Google', 'I need legal advice regarding my divorce.', 'new', NULL, NULL, NULL, '2026-07-24 05:30:48.515', '2026-07-24 05:30:48.515', 1);

-- --------------------------------------------------------

--
-- Table structure for table `matters`
--

CREATE TABLE `matters` (
  `id` int(11) NOT NULL,
  `matter_number` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `client_id` int(11) NOT NULL,
  `assigned_lawyer_id` int(11) DEFAULT NULL,
  `practice_area` varchar(191) NOT NULL,
  `matter_type` varchar(191) NOT NULL,
  `opposing_party_name` varchar(191) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('pending','active','completed') NOT NULL DEFAULT 'pending',
  `opened_at` datetime(3) DEFAULT NULL,
  `closed_at` datetime(3) DEFAULT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `next_hearing` datetime(3) DEFAULT NULL,
  `case_number` varchar(191) DEFAULT NULL,
  `court_address` varchar(191) DEFAULT NULL,
  `court_name` varchar(191) DEFAULT NULL,
  `date_of_loss` datetime(3) DEFAULT NULL,
  `initial_filing_date` datetime(3) DEFAULT NULL,
  `judge_name` varchar(191) DEFAULT NULL,
  `priority` varchar(191) NOT NULL DEFAULT 'medium',
  `trial_date` datetime(3) DEFAULT NULL,
  `agency_id` int(11) NOT NULL DEFAULT 1,
  `office_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `matter_custom_field_values`
--

CREATE TABLE `matter_custom_field_values` (
  `id` int(11) NOT NULL,
  `matter_id` int(11) NOT NULL,
  `field_definition_id` int(11) NOT NULL,
  `value` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `matter_status_history`
--

CREATE TABLE `matter_status_history` (
  `id` int(11) NOT NULL,
  `matter_id` int(11) NOT NULL,
  `old_status` enum('pending','active','completed') NOT NULL,
  `new_status` enum('pending','active','completed') NOT NULL,
  `changed_by_user_id` int(11) NOT NULL,
  `note` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `message` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `reference_id` int(11) DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `offices`
--

CREATE TABLE `offices` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `city` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'active',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `offices`
--

INSERT INTO `offices` (`id`, `name`, `agency_id`, `city`, `status`, `is_deleted`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'indore branch ', 1, 'Khargone (West Nimar)', 'active', 0, NULL, '2026-07-23 11:36:49.925', '2026-07-23 11:36:49.925'),
(101, 'Gothenburg Branch', 101, 'Gothenburg', 'inactive', 1, '2026-07-24 09:58:45.921', '2026-07-24 05:30:48.222', '2026-07-24 09:58:45.923'),
(102, 'Malmö Office', 102, 'Malmö', 'inactive', 1, '2026-07-24 09:58:42.321', '2026-07-24 05:30:48.226', '2026-07-24 09:58:42.323'),
(103, 'Uppsala Branch', 103, 'Uppsala', 'inactive', 1, '2026-07-24 09:58:34.689', '2026-07-24 05:30:48.228', '2026-07-24 09:58:34.691');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `matter_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(191) DEFAULT NULL,
  `payment_reference` varchar(191) DEFAULT NULL,
  `paid_on` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `created_by_user_id` int(11) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `practice_areas`
--

CREATE TABLE `practice_areas` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `practice_areas`
--

INSERT INTO `practice_areas` (`id`, `name`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Civil Litigation', 1, '2026-07-24 05:30:48.545', '2026-07-24 05:30:48.545'),
(2, 'Family Law', 1, '2026-07-24 05:30:48.548', '2026-07-24 05:30:48.548'),
(3, 'Criminal Defense', 1, '2026-07-24 05:30:48.553', '2026-07-24 05:30:48.553'),
(4, 'Corporate Law', 1, '2026-07-24 05:30:48.556', '2026-07-24 05:30:48.556'),
(5, 'Real Estate', 1, '2026-07-24 05:30:48.559', '2026-07-24 05:30:48.559'),
(6, 'Employment Law', 1, '2026-07-24 05:30:48.562', '2026-07-24 05:30:48.562'),
(7, 'Intellectual Property', 1, '2026-07-24 05:30:48.564', '2026-07-24 05:30:48.564');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` datetime(3) NOT NULL,
  `end_date` datetime(3) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`)),
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `title`, `category`, `start_date`, `end_date`, `data`, `created_by`, `created_at`) VALUES
(5, 'lionREport', 'Financial', '2026-07-25 00:00:00.000', '2026-07-25 00:00:00.000', '{\"leads\":0,\"matters\":0,\"revenue\":0,\"hours\":0}', 9, '2026-07-24 10:02:45.131');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `key` varchar(191) NOT NULL,
  `value` varchar(191) NOT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `signatures`
--

CREATE TABLE `signatures` (
  `id` int(11) NOT NULL,
  `draft_id` int(11) NOT NULL,
  `signed_by_user_id` int(11) NOT NULL,
  `signature_data` longtext DEFAULT NULL,
  `signed_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `ip_address` varchar(191) DEFAULT NULL,
  `device_info` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `signature_requests`
--

CREATE TABLE `signature_requests` (
  `id` int(11) NOT NULL,
  `draft_id` int(11) NOT NULL,
  `token` varchar(191) NOT NULL,
  `recipient_email` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `expires_at` datetime(3) NOT NULL,
  `completed_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `social_links`
--

CREATE TABLE `social_links` (
  `id` int(11) NOT NULL,
  `platform` enum('LinkedIn','Instagram','Facebook','YouTube') NOT NULL,
  `url` varchar(191) DEFAULT NULL,
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `social_links`
--

INSERT INTO `social_links` (`id`, `platform`, `url`, `updated_at`) VALUES
(1, 'LinkedIn', '', '2026-07-24 05:30:48.528'),
(2, 'Instagram', '', '2026-07-24 05:30:48.532'),
(3, 'Facebook', '', '2026-07-24 05:30:48.538'),
(4, 'YouTube', '', '2026-07-24 05:30:48.541');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `priority` varchar(191) NOT NULL DEFAULT 'medium',
  `status` varchar(191) NOT NULL DEFAULT 'open',
  `task_type` varchar(191) DEFAULT 'general',
  `assigned_user_id` int(11) DEFAULT NULL,
  `matter_id` int(11) DEFAULT NULL,
  `due_date` datetime(3) DEFAULT NULL,
  `completed_at` datetime(3) DEFAULT NULL,
  `reminder_date` datetime(3) DEFAULT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `reminder_sent` tinyint(1) NOT NULL DEFAULT 0,
  `activity_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `content` longtext DEFAULT NULL,
  `category` varchar(191) DEFAULT 'court_form',
  `practice_area` varchar(191) DEFAULT NULL,
  `matter_type` varchar(191) DEFAULT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `time_entries`
--

CREATE TABLE `time_entries` (
  `id` int(11) NOT NULL,
  `matter_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_time` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `end_time` datetime(3) DEFAULT NULL,
  `duration_minutes` int(11) DEFAULT NULL,
  `is_running` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trust_accounts`
--

CREATE TABLE `trust_accounts` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trust_transactions`
--

CREATE TABLE `trust_transactions` (
  `id` int(11) NOT NULL,
  `trust_account_id` int(11) NOT NULL,
  `matter_id` int(11) DEFAULT NULL,
  `client_id` int(11) NOT NULL,
  `transaction_type` enum('deposit','applied_to_invoice','refund','adjustment') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `reference` varchar(191) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password_hash` varchar(191) NOT NULL,
  `role` enum('admin','lawyer','client') NOT NULL DEFAULT 'client',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `must_reset_password` tinyint(1) NOT NULL DEFAULT 0,
  `last_login_at` datetime(3) DEFAULT NULL,
  `outlook_refresh_token` text DEFAULT NULL,
  `outlook_token` text DEFAULT NULL,
  `outlook_token_expires` datetime(3) DEFAULT NULL,
  `signature` text DEFAULT NULL,
  `agency_id` int(11) DEFAULT 1,
  `office_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password_hash`, `role`, `is_active`, `created_at`, `updated_at`, `must_reset_password`, `last_login_at`, `outlook_refresh_token`, `outlook_token`, `outlook_token_expires`, `signature`, `agency_id`, `office_id`) VALUES
(3, 'Sarah mitchell', 'client@pilbagen.se', '$2b$10$l9IRS4RXMqfprZtR1H.E4ec6WyKLOmUjzWJaumLFfyuJCKjXgeTl.', 'client', 1, '2026-04-21 12:47:06.355', '2026-07-24 12:21:10.135', 0, '2026-07-24 12:21:10.133', NULL, NULL, NULL, NULL, 1, NULL),
(6, 'Pilbågen Super Admin', 'superadmin@pilbagen.se', '$2b$10$SK0Rvtyq3HE3E8axFHMc2.x6yyM3GOnATS8/lZESoeKcCSZJWhNM2', 'admin', 1, '2026-07-23 06:34:52.449', '2026-07-24 12:21:18.392', 0, '2026-07-24 12:21:18.389', NULL, NULL, NULL, NULL, 1, 1),
(9, 'vj ja', 'admin@pilbagen.se', '$2b$10$cnjaYf5qmsJp4ic5Q1fEo.BmMTKGaYxXvZDB0EpDC9HQ9eRVdJgVK', 'admin', 1, '2026-07-23 11:38:15.586', '2026-07-24 12:24:06.621', 0, '2026-07-24 12:24:06.618', NULL, NULL, NULL, NULL, 1, NULL),
(14, 'Apex Lawyer 1', 'lawyer1@apexlegal.com', '$2b$10$6VsakM2WQzgOPXhzCkKekeV6pP6UD84KwUhkGFmlIoyCtm9uuwM4y', 'lawyer', 0, '2026-07-23 11:58:02.496', '2026-07-23 11:58:02.496', 0, NULL, NULL, NULL, NULL, NULL, 2, NULL),
(15, 'Apex Paralegal 1', 'paralegal1@apexlegal.com', '$2b$10$jZP7OzkBPjgiuOjvvQjbKuG2UrjdXOM6FG1TUh65R6JfvPDVyiRre', 'lawyer', 0, '2026-07-23 11:58:02.605', '2026-07-23 11:58:02.605', 0, NULL, NULL, NULL, NULL, NULL, 2, NULL),
(16, 'Lexington Partner 1', 'partner1@lexingtonlaw.com', '$2b$10$FnRX3yzgjX0dGKfIHqI7d.3WRKTX1bfQf1i7Qy7kjyQrJwA0Hps8C', 'lawyer', 0, '2026-07-23 11:58:02.702', '2026-07-23 11:58:02.702', 0, NULL, NULL, NULL, NULL, NULL, 3, NULL),
(19, 'lawyerClient 1', 'lawyer@pilbagen.se', '$2b$10$xJbLaP4CYRkR2MT5/e9w7uYd1odEXwTlSlXL2B8zz5Dn/xA7ZikmO', 'lawyer', 1, '2026-07-23 12:21:16.939', '2026-07-24 12:20:59.469', 1, '2026-07-24 12:20:59.467', NULL, NULL, NULL, NULL, 1, NULL),
(22, 'vj_partner r', 'partner@pilbagen.se', '$2b$10$7jaqMPF3acfaR00v.OFGw.gjqAhJXbyDg8GvO.OFFR5oyu3m11zyO', 'lawyer', 1, '2026-07-24 05:53:19.550', '2026-07-24 11:38:03.593', 0, '2026-07-24 09:46:46.232', NULL, NULL, NULL, NULL, 1, NULL),
(23, 'paralegal l', 'paralegal@pilbagen.se', '$2b$10$VPcaqbslXWVdXz8INrayUetws9Dx9kywhKEhG5ur4Zthbxygpv14O', 'lawyer', 1, '2026-07-24 05:54:39.420', '2026-07-24 11:38:47.699', 0, '2026-07-24 10:11:01.094', NULL, NULL, NULL, NULL, 1, NULL),
(24, 'kiaan admin', 'ka@gmail.com', '$2b$10$YicRB4Nala5En6UiRk20cO50ohGSppMeSaLaqf1YwLYw5rh7I0GKC', 'admin', 1, '2026-07-24 06:21:59.482', '2026-07-24 12:21:46.932', 0, '2026-07-24 12:21:46.929', NULL, NULL, NULL, NULL, 104, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `user_id`, `role`) VALUES
(3, 3, 'client'),
(23, 6, 'super_admin'),
(54, 9, 'admin'),
(34, 14, 'lawyer'),
(35, 15, 'paralegal'),
(36, 16, 'partner'),
(51, 19, 'lawyer'),
(47, 22, 'partner'),
(48, 23, 'paralegal'),
(45, 24, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `_matterparties`
--

CREATE TABLE `_matterparties` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activities_matter_id_fkey` (`matter_id`),
  ADD KEY `activities_actor_user_id_fkey` (`actor_user_id`);

--
-- Indexes for table `agencies`
--
ALTER TABLE `agencies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `agencies_email_key` (`email`);

--
-- Indexes for table `calendar_categories`
--
ALTER TABLE `calendar_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `calendar_categories_name_key` (`name`);

--
-- Indexes for table `calendar_events`
--
ALTER TABLE `calendar_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `calendar_events_matter_id_fkey` (`matter_id`),
  ADD KEY `calendar_events_activity_id_fkey` (`activity_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clients_user_id_key` (`user_id`);

--
-- Indexes for table `communications`
--
ALTER TABLE `communications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `communications_matter_id_fkey` (`matter_id`),
  ADD KEY `communications_sender_user_id_fkey` (`sender_user_id`),
  ADD KEY `communications_parent_id_fkey` (`parent_id`),
  ADD KEY `communications_activity_id_fkey` (`activity_id`),
  ADD KEY `communications_email_account_id_fkey` (`email_account_id`);

--
-- Indexes for table `company_profile`
--
ALTER TABLE `company_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conflict_checks`
--
ALTER TABLE `conflict_checks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conflict_checks_created_by_user_id_fkey` (`created_by_user_id`);

--
-- Indexes for table `court_form_field_mappings`
--
ALTER TABLE `court_form_field_mappings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `court_form_field_mappings_template_id_fkey` (`template_id`);

--
-- Indexes for table `court_form_mappings`
--
ALTER TABLE `court_form_mappings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `court_form_mappings_template_id_pdf_field_name_key` (`template_id`,`pdf_field_name`);

--
-- Indexes for table `court_form_templates`
--
ALTER TABLE `court_form_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `court_form_templates_form_number_key` (`form_number`);

--
-- Indexes for table `custom_field_definitions`
--
ALTER TABLE `custom_field_definitions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `documents_matter_id_fkey` (`matter_id`),
  ADD KEY `documents_uploaded_by_user_id_fkey` (`uploaded_by_user_id`),
  ADD KEY `documents_folder_id_fkey` (`folder_id`);

--
-- Indexes for table `document_categories`
--
ALTER TABLE `document_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `document_categories_name_key` (`name`);

--
-- Indexes for table `drafts`
--
ALTER TABLE `drafts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `drafts_matter_id_fkey` (`matter_id`),
  ADD KEY `drafts_created_by_user_id_fkey` (`created_by_user_id`),
  ADD KEY `drafts_last_updated_by_user_id_fkey` (`last_updated_by_user_id`);

--
-- Indexes for table `email_accounts`
--
ALTER TABLE `email_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email_accounts_user_id_fkey` (`user_id`);

--
-- Indexes for table `event_attendees`
--
ALTER TABLE `event_attendees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_attendees_event_id_fkey` (`event_id`),
  ADD KEY `event_attendees_user_id_fkey` (`user_id`);

--
-- Indexes for table `folders`
--
ALTER TABLE `folders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `folders_matter_id_fkey` (`matter_id`);

--
-- Indexes for table `generated_forms`
--
ALTER TABLE `generated_forms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `generated_forms_template_id_fkey` (`template_id`),
  ADD KEY `generated_forms_matter_id_fkey` (`matter_id`),
  ADD KEY `generated_forms_created_by_fkey` (`created_by`);

--
-- Indexes for table `generic_activities`
--
ALTER TABLE `generic_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoices_invoice_number_key` (`invoice_number`),
  ADD KEY `invoices_matter_id_fkey` (`matter_id`),
  ADD KEY `invoices_created_by_user_id_fkey` (`created_by_user_id`);

--
-- Indexes for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_items_invoice_id_fkey` (`invoice_id`);

--
-- Indexes for table `lawyers`
--
ALTER TABLE `lawyers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lawyers_user_id_key` (`user_id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leads_created_by_user_id_fkey` (`created_by_user_id`),
  ADD KEY `leads_converted_client_id_fkey` (`converted_client_id`);

--
-- Indexes for table `matters`
--
ALTER TABLE `matters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matters_matter_number_key` (`matter_number`),
  ADD KEY `matters_client_id_fkey` (`client_id`),
  ADD KEY `matters_assigned_lawyer_id_fkey` (`assigned_lawyer_id`),
  ADD KEY `matters_created_by_user_id_fkey` (`created_by_user_id`),
  ADD KEY `matters_office_id_fkey` (`office_id`);

--
-- Indexes for table `matter_custom_field_values`
--
ALTER TABLE `matter_custom_field_values`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matter_custom_field_values_matter_id_field_definition_id_key` (`matter_id`,`field_definition_id`),
  ADD KEY `matter_custom_field_values_field_definition_id_fkey` (`field_definition_id`);

--
-- Indexes for table `matter_status_history`
--
ALTER TABLE `matter_status_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `matter_status_history_matter_id_fkey` (`matter_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_fkey` (`user_id`);

--
-- Indexes for table `offices`
--
ALTER TABLE `offices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `offices_agency_id_fkey` (`agency_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_invoice_id_fkey` (`invoice_id`),
  ADD KEY `payments_matter_id_fkey` (`matter_id`),
  ADD KEY `payments_created_by_user_id_fkey` (`created_by_user_id`);

--
-- Indexes for table `practice_areas`
--
ALTER TABLE `practice_areas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `practice_areas_name_key` (`name`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_key` (`key`);

--
-- Indexes for table `signatures`
--
ALTER TABLE `signatures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `signatures_draft_id_fkey` (`draft_id`);

--
-- Indexes for table `signature_requests`
--
ALTER TABLE `signature_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `signature_requests_token_key` (`token`),
  ADD KEY `signature_requests_draft_id_fkey` (`draft_id`);

--
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `social_links_platform_key` (`platform`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_assigned_user_id_fkey` (`assigned_user_id`),
  ADD KEY `tasks_created_by_user_id_fkey` (`created_by_user_id`),
  ADD KEY `tasks_matter_id_fkey` (`matter_id`),
  ADD KEY `tasks_activity_id_fkey` (`activity_id`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `templates_created_by_user_id_fkey` (`created_by_user_id`);

--
-- Indexes for table `time_entries`
--
ALTER TABLE `time_entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `time_entries_matter_id_fkey` (`matter_id`),
  ADD KEY `time_entries_user_id_fkey` (`user_id`);

--
-- Indexes for table `trust_accounts`
--
ALTER TABLE `trust_accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `trust_accounts_client_id_key` (`client_id`);

--
-- Indexes for table `trust_transactions`
--
ALTER TABLE `trust_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trust_transactions_trust_account_id_fkey` (`trust_account_id`),
  ADD KEY `trust_transactions_matter_id_fkey` (`matter_id`),
  ADD KEY `trust_transactions_client_id_fkey` (`client_id`),
  ADD KEY `trust_transactions_created_by_user_id_fkey` (`created_by_user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`),
  ADD KEY `users_agency_id_fkey` (`agency_id`),
  ADD KEY `users_office_id_fkey` (`office_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_roles_user_id_role_key` (`user_id`,`role`);

--
-- Indexes for table `_matterparties`
--
ALTER TABLE `_matterparties`
  ADD UNIQUE KEY `_matterparties_AB_unique` (`A`,`B`),
  ADD KEY `_matterparties_B_index` (`B`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `agencies`
--
ALTER TABLE `agencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `calendar_categories`
--
ALTER TABLE `calendar_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `calendar_events`
--
ALTER TABLE `calendar_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `communications`
--
ALTER TABLE `communications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company_profile`
--
ALTER TABLE `company_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `conflict_checks`
--
ALTER TABLE `conflict_checks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `court_form_field_mappings`
--
ALTER TABLE `court_form_field_mappings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `court_form_mappings`
--
ALTER TABLE `court_form_mappings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `court_form_templates`
--
ALTER TABLE `court_form_templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `custom_field_definitions`
--
ALTER TABLE `custom_field_definitions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `document_categories`
--
ALTER TABLE `document_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `drafts`
--
ALTER TABLE `drafts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `email_accounts`
--
ALTER TABLE `email_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_attendees`
--
ALTER TABLE `event_attendees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `folders`
--
ALTER TABLE `folders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `generated_forms`
--
ALTER TABLE `generated_forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `generic_activities`
--
ALTER TABLE `generic_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `invoice_items`
--
ALTER TABLE `invoice_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `lawyers`
--
ALTER TABLE `lawyers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `matters`
--
ALTER TABLE `matters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `matter_custom_field_values`
--
ALTER TABLE `matter_custom_field_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `matter_status_history`
--
ALTER TABLE `matter_status_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `offices`
--
ALTER TABLE `offices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `practice_areas`
--
ALTER TABLE `practice_areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `signatures`
--
ALTER TABLE `signatures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `signature_requests`
--
ALTER TABLE `signature_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `social_links`
--
ALTER TABLE `social_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `time_entries`
--
ALTER TABLE `time_entries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `trust_accounts`
--
ALTER TABLE `trust_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trust_transactions`
--
ALTER TABLE `trust_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `activities_actor_user_id_fkey` FOREIGN KEY (`actor_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `activities_matter_id_fkey` FOREIGN KEY (`matter_id`) REFERENCES `matters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `calendar_events`
--
ALTER TABLE `calendar_events`
  ADD CONSTRAINT `calendar_events_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `generic_activities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `calendar_events_matter_id_fkey` FOREIGN KEY (`matter_id`) REFERENCES `matters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `communications`
--
ALTER TABLE `communications`
  ADD CONSTRAINT `communications_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `generic_activities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `communications_email_account_id_fkey` FOREIGN KEY (`email_account_id`) REFERENCES `email_accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `communications_matter_id_fkey` FOREIGN KEY (`matter_id`) REFERENCES `matters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `communications_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `communications` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `communications_sender_user_id_fkey` FOREIGN KEY (`sender_user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `conflict_checks`
--
ALTER TABLE `conflict_checks`
  ADD CONSTRAINT `conflict_checks_created_by_user_id_fkey` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `court_form_field_mappings`
--
ALTER TABLE `court_form_field_mappings`
  ADD CONSTRAINT `court_form_field_mappings_template_id_fkey` FOREIGN KEY (`template_id`) REFERENCES `court_form_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `court_form_mappings`
--
ALTER TABLE `court_form_mappings`
  ADD CONSTRAINT `court_form_mappings_template_id_fkey` FOREIGN KEY (`template_id`) REFERENCES `court_form_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_folder_id_fkey` FOREIGN KEY (`folder_id`) REFERENCES `folders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `documents_matter_id_fkey` FOREIGN KEY (`matter_id`) REFERENCES `matters` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `documents_uploaded_by_user_id_fkey` FOREIGN KEY (`uploaded_by_user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `drafts`
--
ALTER TABLE `drafts`
  ADD CONSTRAINT `drafts_created_by_user_id_fkey` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `drafts_last_updated_by_user_id_fkey` FOREIGN KEY (`last_updated_by_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `drafts_matter_id_fkey` FOREIGN KEY (`matter_id`) REFERENCES `matters` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `email_accounts`
--
ALTER TABLE `email_accounts`
  ADD CONSTRAINT `email_accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `event_attendees`
--
ALTER TABLE `event_attendees`
  ADD CONSTRAINT `event_attendees_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `calendar_events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `event_attendees_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `folders`
--
ALTER TABLE `folders`
  ADD CONSTRAINT `folders_matter_id_fkey` FOREIGN KEY (`matter_id`) REFERENCES `matters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `generated_forms`
--
ALTER TABLE `generated_forms`
  ADD CONSTRAINT `generated_forms_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `generated_forms_matter_id_fkey` FOREIGN KEY (`matter_id`) REFERENCES `matters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `generated_forms_template_id_fkey` FOREIGN KEY (`template_id`) REFERENCES `court_form_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_created_by_user_id_fkey` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_matter_id_fkey` FOREIGN KEY (`matter_id`) REFERENCES `matters` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD CONSTRAINT `invoice_items_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lawyers`
--
ALTER TABLE `lawyers`
  ADD CONSTRAINT `lawyers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `leads`
--
ALTER TABLE `leads`
  ADD CONSTRAINT `leads_converted_client_id_fkey` FOREIGN KEY (`converted_client_id`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leads_created_by_user_id_fkey` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `matters`
--
ALTER TABLE `matters`
  ADD CONSTRAINT `matters_assigned_lawyer_id_fkey` FOREIGN KEY (`assigned_lawyer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `matters_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `matters_created_by_user_id_fkey` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `matters_office_id_fkey` FOREIGN KEY (`office_id`) REFERENCES `offices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `matter_custom_field_values`
--
ALTER TABLE `matter_custom_field_values`
  ADD CONSTRAINT `matter_custom_field_values_field_definition_id_fkey` FOREIGN KEY (`field_definition_id`) REFERENCES `custom_field_definitions` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `matter_status_history`
--
ALTER TABLE `matter_status_history`
  ADD CONSTRAINT `matter_status_history_matter_id_fkey` FOREIGN KEY (`matter_id`) REFERENCES `matters` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `offices`
--
ALTER TABLE `offices`
  ADD CONSTRAINT `offices_agency_id_fkey` FOREIGN KEY (`agency_id`) REFERENCES `agencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_created_by_user_id_fkey` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_matter_id_fkey` FOREIGN KEY (`matter_id`) REFERENCES `matters` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `signatures`
--
ALTER TABLE `signatures`
  ADD CONSTRAINT `signatures_draft_id_fkey` FOREIGN KEY (`draft_id`) REFERENCES `drafts` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `signature_requests`
--
ALTER TABLE `signature_requests`
  ADD CONSTRAINT `signature_requests_draft_id_fkey` FOREIGN KEY (`draft_id`) REFERENCES `drafts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `generic_activities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_assigned_user_id_fkey` FOREIGN KEY (`assigned_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_created_by_user_id_fkey` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_matter_id_fkey` FOREIGN KEY (`matter_id`) REFERENCES `matters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `templates`
--
ALTER TABLE `templates`
  ADD CONSTRAINT `templates_created_by_user_id_fkey` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `time_entries`
--
ALTER TABLE `time_entries`
  ADD CONSTRAINT `time_entries_matter_id_fkey` FOREIGN KEY (`matter_id`) REFERENCES `matters` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `time_entries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `trust_accounts`
--
ALTER TABLE `trust_accounts`
  ADD CONSTRAINT `trust_accounts_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `trust_transactions`
--
ALTER TABLE `trust_transactions`
  ADD CONSTRAINT `trust_transactions_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `trust_transactions_created_by_user_id_fkey` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `trust_transactions_matter_id_fkey` FOREIGN KEY (`matter_id`) REFERENCES `matters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `trust_transactions_trust_account_id_fkey` FOREIGN KEY (`trust_account_id`) REFERENCES `trust_accounts` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_agency_id_fkey` FOREIGN KEY (`agency_id`) REFERENCES `agencies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_office_id_fkey` FOREIGN KEY (`office_id`) REFERENCES `offices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_matterparties`
--
ALTER TABLE `_matterparties`
  ADD CONSTRAINT `_matterparties_A_fkey` FOREIGN KEY (`A`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_matterparties_B_fkey` FOREIGN KEY (`B`) REFERENCES `matters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
