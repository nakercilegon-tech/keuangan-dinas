<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $page_title ?? 'SIMKEU UPTD' ?></title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome 6 Icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet">
    <!-- Custom Layout CSS -->
    <style>
        :root {
            --sidebar-width: 260px;
            --primary-color: #4f46e5;
            --sidebar-bg: #0f172a;
        }
        body {
            font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
            background-color: #f8fafc;
            min-height: 100vh;
        }
        .wrapper {
            display: flex;
            width: 100%;
            align-items: stretch;
        }
        #sidebar {
            min-width: var(--sidebar-width);
            max-width: var(--sidebar-width);
            background: var(--sidebar-bg);
            color: #94a3b8;
            transition: all 0.3s;
            min-height: 100vh;
            z-index: 1000;
        }
        #sidebar .sidebar-header {
            padding: 20px 18px;
            background: #020617;
            border-bottom: 1px solid #1e293b;
        }
        #sidebar .nav-section {
            padding: 12px 18px 4px;
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #64748b;
        }
        #sidebar ul.components {
            padding: 10px 0;
        }
        #sidebar ul li a {
            padding: 10px 20px;
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 12px;
            color: #cbd5e1;
            text-decoration: none;
            transition: 0.2s;
            border-left: 3px solid transparent;
        }
        #sidebar ul li a:hover, #sidebar ul li.active > a {
            color: #ffffff;
            background: #1e293b;
            border-left-color: var(--primary-color);
        }
        #content {
            width: 100%;
            padding: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .top-navbar {
            background: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            padding: 12px 24px;
        }
        .main-body {
            padding: 24px;
            flex: 1;
        }
        .stat-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
    </style>
</head>
<body>
<div class="wrapper">
