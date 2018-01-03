<?php
    header("content-type:application/json;charset=utf-8");
    require('init.php');
    $sid=$_REQUEST['sid'];
    $did=$_REQUEST['did'];
    $sql="SELECT * FROM dishs WHERE did=$did AND sid=$sid";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $output[]=$rows;
    echo json_encode($output);
?>