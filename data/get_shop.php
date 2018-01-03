<?php
    header("content-type:application/json;charset=utf-8");
    require("init.php");
    $sql="SELECT * FROM shoplist";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $output[]=$rows;
    echo json_encode($output);
?>