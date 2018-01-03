<?php
    header("content-type:application/json;charset=utf-8");
    require("init.php");
    $cid=$_REQUEST['cid'];
    $sql="DELETE FROM cart WHERE cid=$cid";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_affected_rows($conn);
    if($rows!=null){
        echo 1;
    }
    else{
        $output['msg']="É¾³ýÊ§°Ü";
    }
?>