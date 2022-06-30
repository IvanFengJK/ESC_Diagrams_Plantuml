package com.example.testing;

import org.junit.Test;

public class DiskStatementCoverage {
    @Test(timeout = 500)
    public void manipulate_xMoreThan1000_yLessThan1() throws InterruptedException{
        // Path 1, Path 2
        Disk d = new Disk(1010, -20);
        d.manipulate();
    }

    @Test
    public void manipulate_xEquals5_yLessThan1(){
        // Path 2, Path 1
        Disk d = new Disk(5, -20);
        d.manipulate();
    }

}
