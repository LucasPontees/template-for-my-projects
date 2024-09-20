<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calcule seu ICMS</title>

    <!-- Link para o CSS do Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>

    <div class="container mt-5">
        <h2 class="text-center">Calculo ICMS-ST com redução de base</h2>

        <?php
        $estadoOrigem = isset($_POST['estadoOrigem']) ? $_POST['estadoOrigem'] : null;
        $estadoDestino = isset($_POST['estadoDestino']) ? $_POST['estadoDestino'] : null;
        if ($estadoOrigem === $estadoDestino) {
            $aliquota = 20.00 / 100;
        } else {
            $aliquota = 12.00 / 100;
        }
        if ($estadoDestino == "RR") {
            $aliquotaEstado = 20.00;
        } else if ($estadoDestino == "AM") {
            $aliquotaEstado = 20.00;
        } else {
            $aliquotaEstado = 12.00;
        }

        $valor_base_item = isset($_POST['valor_base_item']) ? $_POST['valor_base_item'] : null;
        $pReducaoBase = isset($_POST['pReducaoBase']) ? $_POST['pReducaoBase'] : null;
        $pReducaoBaseRed = $pReducaoBase / 100;
        $valorBase    = ($valor_base_item * (1 - $pReducaoBaseRed));
        $valorICMS    = $valorBase * $aliquota;
        $pMVA = isset($_POST['pMVA']) ? $_POST['pMVA'] : null;
        $percMVA         = $pMVA / 100;
        $basest       = $valor_base_item * (1 + $percMVA);
        $percentualICMSSTDestino = $aliquotaEstado / 100;
        $vICMSST      = ($basest * $percentualICMSSTDestino) - $valorICMS;

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo '<div class="alert alert-info">Valor ICMS ST: R$ ' . number_format($vICMSST, 2, ',', '.') . '</div>';
        }
        ?>

        <form method="post" style="border: solid 1px #ccc; padding: 20px" id="form-icms">
            <div class="mb-3">
                <label for="estadoOrigem" class="form-label">Origem:</label>
                <select class="form-select" id="estadoOrigem" name="estadoOrigem">
                    <option value="AM" <?= ($estadoOrigem == 'AM') ? 'selected' : '' ?>>AM (Amazonas)</option>
                    <option value="RR" <?= ($estadoOrigem == 'RR') ? 'selected' : '' ?>>RR (Roraima)</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="estadoDestino" class="form-label">Destino:</label>
                <select class="form-select" id="estadoDestino" name="estadoDestino">
                    <option value="AM" <?= ($estadoDestino == 'AM') ? 'selected' : '' ?>>AM (Amazonas)</option>
                    <option value="RR" <?= ($estadoDestino == 'RR') ? 'selected' : '' ?>>RR (Roraima)</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="valor_base_item" class="form-label">Valor do Produto:</label>
                <input type="text" class="form-control" id="valor_base_item" name="valor_base_item" value="<?= $valor_base_item ?>">
            </div>
            <div class="mb-3">
                <label for="pReducaoBase" class="form-label">Percentual de Redução de Base:</label>
                <input type="text" class="form-control" id="pReducaoBase" name="pReducaoBase" value="<?= $pReducaoBase ?>">
            </div>
            <div class="mb-3">
                <label for="pMVA" class="form-label">MVA:</label>
                <input type="text" class="form-control" id="pMVA" name="pMVA" value="<?= $pMVA ?>">
            </div>
            <button type="submit" class="btn btn-primary">Verificar</button>
            <button type="button" class="btn btn-secondary" onclick="limparFormulario();">Limpar</button>
        </form>
    </div>

    <!-- JS do Bootstrap (Opcional, para funcionalidade como dropdowns) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        function limparFormulario() {
            document.getElementById("form-icms").reset();
        }
    </script>
</body>

</html>