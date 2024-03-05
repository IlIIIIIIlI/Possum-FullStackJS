import React from 'react';
import { render, screen } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import LikedPosts from './LikedPosts';
import { render, screen } from '@testing-library/react';
import LikedPosts from './LikedPosts';
import LikedPosts from './LikedPosts';

jest.mock('@/lib/react-query/queries', () => ({
  useGetCurrentUser: jest.fn(),
}));

describe('LikedPosts', () => {
  it('should render loader when currentUser is not available', () => {
    const useGetCurrentUserMock = jest.requireMock('@/lib/react-query/queries').useGetCurrentUser;
    useGetCurrentUserMock.mockReturnValue({ data: null });

    const { getByTestId } = render(<LikedPosts />);
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('should render "No liked posts" when currentUser has no liked posts', () => {
    const useGetCurrentUserMock = jest.requireMock('@/lib/react-query/queries').useGetCurrentUser;
    useGetCurrentUserMock.mockReturnValue({ data: { liked: [] } });

    const { getByText } = render(<LikedPosts />);
    expect(getByText('No liked posts')).toBeInTheDocument();
  });

  it('should render GridPostList when currentUser has liked posts', () => {
    const useGetCurrentUserMock = jest.requireMock('@/lib/react-query/queries').useGetCurrentUser;
    useGetCurrentUserMock.mockReturnValue({ data: { liked: [{ id: 1, title: 'Post 1' }] } });

    const { getByText } = render(<LikedPosts />);
    expect(getByText('Post 1')).toBeInTheDocument();
  });
});
