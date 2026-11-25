CREATE DATABASE IF NOT EXISTS la_nueva_vuelta
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE la_nueva_vuelta;

CREATE TABLE IF NOT EXISTS comments (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  content_id VARCHAR(40) NOT NULL,
  visitor_id CHAR(36) NOT NULL,
  name VARCHAR(60) NOT NULL,
  comment_text VARCHAR(1000) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_comments_content_created (content_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS reactions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  content_id VARCHAR(40) NOT NULL,
  visitor_id CHAR(36) NOT NULL,
  reaction_type VARCHAR(16) NOT NULL DEFAULT 'like',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_reactions_content_visitor (content_id, visitor_id),
  INDEX idx_reactions_content (content_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS shares (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  content_id VARCHAR(40) NOT NULL,
  visitor_id CHAR(36) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_shares_content_created (content_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
