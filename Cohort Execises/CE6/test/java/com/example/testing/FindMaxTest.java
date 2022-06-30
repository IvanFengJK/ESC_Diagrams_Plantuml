package com.example.testing;

import static org.junit.Assert.*;
import org.junit.Test;

public class FindMaxTest {
    @Test
    public void max_givenValidArray_shouldReturnWrongOutput2() {
        // Putting the largest at the back will fail
        int m = FindMax.max(new int [] {1, 2, 3});
        assertNotEquals(3, m);
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void throwException(){
        FindMax.max(new int [] {});
    }

    @Test
    public void max_givenValidArray_shouldReturnValidOutput2() {
        // as long as the largest is not the last element
        int m = FindMax.max(new int [] {3, 2, 1});
        assertEquals(3, m);
    }

}

