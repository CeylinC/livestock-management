import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type PaginationProps = {
  pageNumber: number;
  setPageNumber: (value: number) => void;
  totalPages: number;
};

export default function Pagination({ pageNumber, setPageNumber, totalPages }: PaginationProps) {
  const handlePageClick = (page: number) => {
    setPageNumber(page);
  };

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (pageNumber <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (pageNumber >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', pageNumber - 1, pageNumber, pageNumber + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={pageNumber === 1}
        onPress={() => handlePageClick(pageNumber - 1)}
        style={[styles.button, pageNumber === 1 && styles.disabled]}
      >
        <Text style={styles.text}>←</Text>
      </TouchableOpacity>

      {getVisiblePages().map((page, index) =>
        typeof page === 'number' ? (
          <TouchableOpacity
            key={index}
            onPress={() => handlePageClick(page)}
            style={[
              page !== pageNumber && styles.button,
            ]}
          >
            {
              page === pageNumber ? (
                <LinearGradient
                  colors={['#0A8270', '#7CFF6B']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.button}
                >
                  <Text style={[styles.text, page === pageNumber && styles.activeText]}>
                    {page}
                  </Text>
                </LinearGradient>
              ) : (
            <Text style={[styles.text]}>
              {page}
            </Text>
            ) 
            }
          </TouchableOpacity>
        ) : (
          <Text key={index} style={styles.ellipsis}>
            ...
          </Text>
        )
      )}

      <TouchableOpacity
        disabled={pageNumber === totalPages}
        onPress={() => handlePageClick(pageNumber + 1)}
        style={[styles.button, pageNumber === totalPages && styles.disabled]}
      >
        <Text style={styles.text}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
  },
  activeButton: {
    backgroundColor: '#0A8270',
  },
  text: {
    color: '#000',
  },
  activeText: {
    color: '#fff',
  },
  disabled: {
    opacity: 0.5,
  },
  ellipsis: {
    paddingHorizontal: 6,
    color: '#9CA3AF',
  },
});
