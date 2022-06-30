package com.example.testing;

import static org.junit.Assert.assertArrayEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
@RunWith(Parameterized.class)
public class QuickSortParameterizedTest {
    public int[] sorted, arr;

    public QuickSortParameterizedTest(int[] sorted, int[] arr) {
        this.arr = arr;
        this.sorted = sorted;
    }

    @Parameterized.Parameters
    public static Collection<Object[]> parameters() {
        return Arrays.asList(new Object[][]{
                {new int[]{0, 5, 7, 89, 111}, new int[]{0, 5, 7, 89, 111}},
                {new int[]{1, 12, 113, 907}, new int[]{113, 907, 12, 1}},
                {new int[]{-1111, -6, -5, -1}, new int[]{-1, -5, -6, -1111}},
                {new int[]{4, 6, 6, 6, 6, 34, 121212}, new int[]{4, 6, 6, 6, 6, 121212, 34}}
        });
    }

    @Test
    public void sortTest() {
        QuickSort quick_sort = new QuickSort();
        quick_sort.sort(arr);
        assertArrayEquals(sorted, arr);
    }
}