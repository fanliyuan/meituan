<?php
    header("content-type:application/json;charset=utf-8");
    require('init.php');
    $sid=$_REQUEST['sid'];
    $sql="SELECT * FROM dishs WHERE sid=$sid";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $sql="SELECT * FROM shoplist WHERE sturn=$sid";
    $result1=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result1,MYSQLI_ASSOC);
    $output[]=$row;
    $output1[]=$rows;
    $out=['shop'=>$output1,'dish'=>$output];
    echo json_encode($out);
?>