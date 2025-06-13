package com.example.usermgmt.repository;

import com.example.usermgmt.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 根据用户名查找用户
     */
    Optional<User> findByUsername(String username);

    /**
     * 根据邮箱查找用户
     */
    Optional<User> findByEmail(String email);

    /**
     * 检查用户名是否存在
     */
    boolean existsByUsername(String username);

    /**
     * 检查邮箱是否存在
     */
    boolean existsByEmail(String email);

    /**
     * 根据角色查找用户
     */
    List<User> findByRole(User.UserRole role);

    /**
     * 根据状态查找用户
     */
    List<User> findByStatus(User.UserStatus status);

    /**
     * 分页搜索用户（用户名、邮箱、姓名）
     */
    @Query("SELECT u FROM User u WHERE " +
           "u.username LIKE %:search% OR " +
           "u.email LIKE %:search% OR " +
           "CONCAT(u.firstName, ' ', u.lastName) LIKE %:search%")
    Page<User> findBySearchTerm(@Param("search") String search, Pageable pageable);

    /**
     * 统计总用户数
     */
    long count();

    /**
     * 统计活跃用户数
     */
    long countByStatus(User.UserStatus status);

    /**
     * 统计某个时间之后创建的用户数
     */
    long countByCreatedAtAfter(LocalDateTime dateTime);

    /**
     * 按角色统计用户数
     */
    @Query("SELECT u.role, COUNT(u) FROM User u GROUP BY u.role")
    List<Object[]> countByRole();

    /**
     * 按状态统计用户数
     */
    @Query("SELECT u.status, COUNT(u) FROM User u GROUP BY u.status")
    List<Object[]> countByStatus();

    /**
     * 获取最近注册的用户
     */
    List<User> findTop5ByOrderByCreatedAtDesc();

    /**
     * 查找最近登录的用户
     */
    List<User> findByLastLoginAtIsNotNullOrderByLastLoginAtDesc(Pageable pageable);

    /**
     * 查找从未登录的用户
     */
    List<User> findByLastLoginAtIsNull();

    /**
     * 更新最后登录时间
     */
    @Query("UPDATE User u SET u.lastLoginAt = :loginTime WHERE u.id = :userId")
    void updateLastLoginTime(@Param("userId") Long userId, @Param("loginTime") LocalDateTime loginTime);
} 