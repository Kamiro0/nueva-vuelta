USE la_nueva_vuelta;

SET @has_reaction_type = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'reactions'
    AND COLUMN_NAME = 'reaction_type'
);

SET @reaction_type_migration = IF(
  @has_reaction_type = 0,
  'ALTER TABLE reactions ADD COLUMN reaction_type VARCHAR(16) NOT NULL DEFAULT ''like'' AFTER visitor_id',
  'SELECT 1'
);

PREPARE reaction_type_statement FROM @reaction_type_migration;
EXECUTE reaction_type_statement;
DEALLOCATE PREPARE reaction_type_statement;

CREATE TABLE IF NOT EXISTS shares (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  content_id VARCHAR(40) NOT NULL,
  visitor_id CHAR(36) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_shares_content_created (content_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
