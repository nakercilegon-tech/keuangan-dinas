<?php
/**
 * Model User - Manajemen Pengguna & Otentikasi
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseModel.php';

class UserModel extends BaseModel {

    protected $table = 'users';

    /**
     * Cari Pengguna Berdasarkan Username
     */
    public function findByUsername($username) {
        $sql = "SELECT * FROM {$this->table} WHERE username = :username AND status = 'aktif' LIMIT 1";
        return $this->fetch($sql, ['username' => $username]);
    }

    /**
     * Verifikasi Kredensial Login
     */
    public function verifyCredentials($username, $password) {
        $user = $this->findByUsername($username);

        if ($user && password_verify($password, $user['password'])) {
            // Update last_login timestamp
            $this->updateLastLogin($user['id']);
            return $user;
        }

        return false;
    }

    /**
     * Update Waktu Login Terakhir
     */
    public function updateLastLogin($id) {
        $sql = "UPDATE {$this->table} SET last_login = NOW() WHERE id = :id";
        return $this->execute($sql, ['id' => $id]);
    }

    /**
     * Dapatkan Semua User Dengan Filter & Pagination
     */
    public function getAllUsers($search = '', $role = '') {
        $sql = "SELECT id, username, nama_lengkap, email, nip, jabatan, role, status, last_login, created_at FROM {$this->table} WHERE 1=1";
        $params = [];

        if (!empty($search)) {
            $sql .= " AND (username LIKE :search OR nama_lengkap LIKE :search OR email LIKE :search OR nip LIKE :search)";
            $params['search'] = '%' . $search . '%';
        }

        if (!empty($role)) {
            $sql .= " AND role = :role";
            $params['role'] = $role;
        }

        $sql .= " ORDER BY created_at DESC";

        return $this->fetchAll($sql, $params);
    }

    /**
     * Tambah Pengguna Baru
     */
    public function createUser($data) {
        $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
        $data['status'] = $data['status'] ?? 'aktif';

        $sql = "INSERT INTO {$this->table} 
                (username, password, nama_lengkap, email, nip, jabatan, role, status, created_at) 
                VALUES 
                (:username, :password, :nama_lengkap, :email, :nip, :jabatan, :role, :status, NOW())";

        return $this->execute($sql, [
            'username'     => sanitize($data['username']),
            'password'     => $data['password'],
            'nama_lengkap' => sanitize($data['nama_lengkap']),
            'email'        => sanitize($data['email']),
            'nip'          => sanitize($data['nip'] ?? ''),
            'jabatan'      => sanitize($data['jabatan'] ?? ''),
            'role'         => sanitize($data['role']),
            'status'       => sanitize($data['status'])
        ]);
    }

    /**
     * Update Data User
     */
    public function updateUser($id, $data) {
        $params = [
            'id'           => $id,
            'nama_lengkap' => sanitize($data['nama_lengkap']),
            'email'        => sanitize($data['email']),
            'nip'          => sanitize($data['nip'] ?? ''),
            'jabatan'      => sanitize($data['jabatan'] ?? ''),
            'role'         => sanitize($data['role']),
            'status'       => sanitize($data['status'])
        ];

        $sql = "UPDATE {$this->table} SET 
                nama_lengkap = :nama_lengkap, 
                email = :email, 
                nip = :nip, 
                jabatan = :jabatan, 
                role = :role, 
                status = :status";

        // Ubah password jika diisi
        if (!empty($data['password'])) {
            $sql .= ", password = :password";
            $params['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
        }

        $sql .= " WHERE id = :id";

        return $this->execute($sql, $params);
    }

    /**
     * Ubah Password Pengguna
     */
    public function changePassword($id, $newPassword) {
        $hashed = password_hash($newPassword, PASSWORD_BCRYPT);
        $sql = "UPDATE {$this->table} SET password = :password WHERE id = :id";
        return $this->execute($sql, ['id' => $id, 'password' => $hashed]);
    }

    /**
     * Hapus Pengguna
     */
    public function deleteUser($id) {
        $sql = "DELETE FROM {$this->table} WHERE id = :id";
        return $this->execute($sql, ['id' => $id]);
    }

    /**
     * Cek Duplikasi Username
     */
    public function isUsernameExists($username, $excludeId = null) {
        $sql = "SELECT COUNT(*) as total FROM {$this->table} WHERE username = :username";
        $params = ['username' => $username];

        if ($excludeId) {
            $sql .= " AND id != :excludeId";
            $params['excludeId'] = $excludeId;
        }

        $result = $this->fetch($sql, $params);
        return ($result['total'] ?? 0) > 0;
    }
}
