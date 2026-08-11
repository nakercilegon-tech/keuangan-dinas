<?php
/**
 * Base Model
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/../../config/database.php';

abstract class BaseModel {
    protected $db;
    protected $table;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function findAll() {
        $stmt = $this->db->query("SELECT * FROM `{$this->table}` ORDER BY id DESC");
        return $stmt->fetchAll();
    }

    public function findById($id) {
        $stmt = $this->db->query("SELECT * FROM `{$this->table}` WHERE id = ?", [$id]);
        return $stmt->fetch();
    }

    public function delete($id) {
        return $this->db->query("DELETE FROM `{$this->table}` WHERE id = ?", [$id]);
    }
}
